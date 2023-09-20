type Sound2Properties = {
	Priority: number?,
	VolumeChangeType: number?,
	VolumeChangeTime: number?,
	Volume: number?,
	MuteOthers: boolean?,
	StartDelay: number?,
	MutedVolume: number?,
	Parent: Instance?,
}

type Sound2 = {
	-- You need to list all the Sound2Properties fields
	SoundObject: Sound,
	Priority: number?,
	VolumeChangeType: number?,
	VolumeChangeTime: number?,
	Volume: number?,
	MuteOthers: boolean?,
	StartDelay: number?,
	MutedVolume: number?,

	Play: (self: Sound2) -> nil;
	Pause: (self: Sound2) -> nil;
	Resume: (self: Sound2) -> nil;
	Stop: (self: Sound2) -> nil;
	AdjustVolume: (self: Sound2, NewVolume: number) -> nil;
}

local TweenService = game:GetService("TweenService")
local VolumeChangeType: {
	Smooth: number;
	Instant: number;
} = {
	Smooth = 1,
	Instant = 2
}

local CurrentSounds = {}
local DefaultProps = {
	Priority = 1,
	VolumeChangeType = VolumeChangeType.Smooth,
	VolumeChangeTime = .25,
	Volume = .5,
	MuteOthers = false,
	StartDelay = 0,
	MutedVolume = 0,
	Parent = "nan",
}

local Sound2 = {}
Sound2.__index = Sound2
Sound2.VolumeChangeType = VolumeChangeType

function UpdateAll()
	for i,v in pairs(CurrentSounds) do
		v:__UPDATE()
	end
end

function Sound2.new(SoundObject: Sound, Properties: Sound2Properties?): Sound2
	local self = setmetatable({}, Sound2)
	return self:Constructor(SoundObject, Properties) or self
end

function Sound2.GetAllPlayingSounds(): { Sound2 }
	return CurrentSounds
end

function Sound2:Constructor(SoundObject: Sound, Properties: Sound2Properties?)
	Properties = Properties or {}

	for i,v in pairs(DefaultProps) do
		self[i] = Properties[i] or v
	end

	self.SoundObject = SoundObject
	self.SoundObject.Ended:Connect(function()
		local Index = table.find(CurrentSounds, self)
		if Index then
			table.remove(CurrentSounds, Index)
		end
		UpdateAll()
	end)
end

function Sound2:Play()
	table.insert(CurrentSounds, self)
	UpdateAll()

	if self.StartDelay > 0 then
		task.delay(self.StartDelay, self.SoundObject.Play, self.SoundObject)
	else
		self.SoundObject:Play()
	end
end

function Sound2:Pause()
	if not self:__EXISTANCE_CHECK() then
		return
	end

	if not self.SoundObject.IsPlaying then
		return
	end

	self.SoundObject:Pause()

	local Index = table.find(CurrentSounds, self)
	if Index then
		table.remove(CurrentSounds, Index)
		UpdateAll()
	end
end

function Sound2:Resume()
	if not self:__EXISTANCE_CHECK() then
		return
	end

	if not self.SoundObject.IsPaused then
		return
	end

	self:__UPDATE()

	self.SoundObject:Resume()
	table.insert(CurrentSounds, self)
end

function Sound2:Stop()
	if not self:__EXISTANCE_CHECK() then
		return
	end

	if not self.SoundObject.IsPlaying then
		return
	end

	self.SoundObject:Stop()

	local Index = table.find(CurrentSounds, self)
	if Index then
		table.remove(CurrentSounds, Index)
		UpdateAll()
	end
end

function Sound2:SetCallback(Name: string, Callback: () -> nil)
	self.Callbacks[Name] = Callback
end

function Sound2:RemoveCallback(Name: string)
	self.Callbacks[Name] = nil
end

function Sound2:AdjustVolume(NewVolume: number)
	if self.VolumeChangeType == VolumeChangeType.Smooth then
		local NumberValue = Instance.new("NumberValue")
		NumberValue.Value = self.Volume
		NumberValue.Parent = script

		NumberValue.Changed:Connect(function(NewValue)
			if not NumberValue then
				return
			end

			self.Volume = NewValue
			self:__UPDATE(true)
		end)

		local Tween = TweenService:Create(NumberValue, TweenInfo.new(self.VolumeChangeTime), {
			Value = NewVolume
		})
		Tween:Play()

		Tween.Completed:Connect(function()
			NumberValue:Destroy()
		end)
	elseif self.VolumeChangeType == VolumeChangeType.Instant then
		self.Volume = NewVolume
		self:__UPDATE(true)
	end
end

function Sound2:__ADJUST_REAL_VOLUME(SkipTween: boolean)
	local SoundInstance = self.SoundObject

	if self.VolumeChangeType == VolumeChangeType.Smooth then
		if SkipTween then
			SoundInstance.Volume = self.__REAL_VOLUME
			return
		end

		TweenService:Create(SoundInstance, TweenInfo.new(self.VolumeChangeTime), {
			Volume = self.__REAL_VOLUME
		}):Play()
	elseif self.VolumeChangeType == VolumeChangeType.Instant then
		SoundInstance.Volume = self.__REAL_VOLUME
	end
end

function Sound2:__UPDATE(SkipTween: boolean)
	if not self:__EXISTANCE_CHECK() then
		return
	end

	self.__REAL_VOLUME = self.Volume
	for i,v in pairs(CurrentSounds) do
		if v == self then
			continue
		end

		if v.Priority > self.Priority and v.MuteOthers then
			self.__REAL_VOLUME = self.MutedVolume
			break
		end
	end

	self:__ADJUST_REAL_VOLUME(SkipTween)
end

function Sound2:__EXISTANCE_CHECK()
	if not self.SoundObject then
		warn("Sound Instance for the following Sound2 Object is nil")
		return
	end

	return true
end

return {
	new = Sound2.new;
	VolumeChangeType = VolumeChangeType;
	GetAllPlayingSounds = Sound2.GetAllPlayingSounds;
}