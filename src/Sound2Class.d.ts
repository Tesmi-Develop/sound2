import { Sound2Properties, SoundProperties } from "../out";

export interface Sound2Constructor {
	/**
	 * Constructs the Sound2 Instance.
	 */
    new(Sound2Properties?: Partial<Sound2Properties>, SoundProperties?: Partial<SoundProperties>): Sound2Instance
}

interface SoundEvents {
    /**
	 * Event that fires whenever the [Sound](https://developer.roblox.com/en-us/api-reference/class/Sound) loops. Returns soundId and numOfTimesLooped, giving the contentID of the sound and the number of times looped respectively.
	 * 
	 * When the [Sound](https://developer.roblox.com/en-us/api-reference/class/Sound) is stopped the looped counter resets meaning the next DidLoop event will return 1 for numOfTimesLooped.
	 */
	readonly DidLoop: RBXScriptSignal<(soundId: string, numOfTimesLooped: number) => void>;
	/**
	 * Fires when the [Sound](https://developer.roblox.com/en-us/api-reference/class/Sound) has completed playback and stopped. Note this event will not fire for sounds with [Sound.Looped](https://developer.roblox.com/en-us/api-reference/property/Sound/Looped) set to true as they continue playing upon reaching their end.
	 * 
	 * This event is often used to destroy a sound when it has completed playback.
	 * 
	 * sound:Play()
	 * sound.Ended:Wait()
	 * sound:Destroy()
	 * 
	 * This event only fires if the sound has reached its end. This means it will also not fire when the sound is stopped before playback has completed, for this use [Sound.Stopped](https://developer.roblox.com/en-us/api-reference/event/Sound/Stopped).
	 */
	readonly Ended: RBXScriptSignal<(soundId: string) => void>;
	/**
	 * The Sound.Loaded event fires when the `/Sound` is loaded.
	 * 
	 * Note this event will only fire at the time the sound is loaded. This means if it is listened for when the sound is already loaded it will not return. Therefore it is recommended to check [Sound.IsLoaded](https://developer.roblox.com/en-us/api-reference/property/Sound/IsLoaded) prior to connecting to this event.
	 */
	readonly Loaded: RBXScriptSignal<(soundId: string) => void>;
	/**
	 * Fires whenever the [Sound](https://developer.roblox.com/en-us/api-reference/class/Sound) is paused using [Sound:Pause](https://developer.roblox.com/en-us/api-reference/function/Sound/Pause).
	 * 
	 * As with [Sound.Played](https://developer.roblox.com/en-us/api-reference/event/Sound/Played), [Sound.Resumed](https://developer.roblox.com/en-us/api-reference/event/Sound/Resumed) and [Sound.Stopped](https://developer.roblox.com/en-us/api-reference/event/Sound/Stopped) only the respective sound function will cause the event to fire. This means that Pause will only fire when [Sound:Pause](https://developer.roblox.com/en-us/api-reference/function/Sound/Pause) is called.
	 */
	readonly Paused: RBXScriptSignal<(soundId: string) => void>;
	/**
	 * Fires whenever the [Sound](https://developer.roblox.com/en-us/api-reference/class/Sound) is played using the [Sound:Play](https://developer.roblox.com/en-us/api-reference/function/Sound/Play) function.
	 * 
	 * As with [Sound.Stopped](https://developer.roblox.com/en-us/api-reference/event/Sound/Stopped), [Sound.Paused](https://developer.roblox.com/en-us/api-reference/event/Sound/Paused) and [Sound.Resumed](https://developer.roblox.com/en-us/api-reference/event/Sound/Resumed) only the respective sound function will cause the event to fire. This means that Played will only fire when [Sound:Play](https://developer.roblox.com/en-us/api-reference/function/Sound/Play) is called. This event will not fire if the [Sound](https://developer.roblox.com/en-us/api-reference/class/Sound) is played due to the sound being destroyed and [Sound.PlayOnRemove](https://developer.roblox.com/en-us/api-reference/property/Sound/PlayOnRemove) being set to true.
	 */
	readonly Played: RBXScriptSignal<(soundId: string) => void>;
	/**
	 * Fires when the [Sound](https://developer.roblox.com/en-us/api-reference/class/Sound) is resumed using [Sound:Resume](https://developer.roblox.com/en-us/api-reference/function/Sound/Resume).
	 * 
	 * As with [Sound.Played](https://developer.roblox.com/en-us/api-reference/event/Sound/Played), [Sound.Paused](https://developer.roblox.com/en-us/api-reference/event/Sound/Paused) and [Sound.Stopped](https://developer.roblox.com/en-us/api-reference/event/Sound/Stopped) only the respective sound function will cause the event to fire. This means that Resumed will only fire when [Sound:Resume](https://developer.roblox.com/en-us/api-reference/function/Sound/Resume) is called.
	 */
	readonly Resumed: RBXScriptSignal<(soundId: string) => void>;
	/**
	 * Fires when the [Sound](https://developer.roblox.com/en-us/api-reference/class/Sound) is stopped due to the [Sound:Stop](https://developer.roblox.com/en-us/api-reference/function/Sound/Stop) function.
	 * 
	 * As with [Sound.Played](https://developer.roblox.com/en-us/api-reference/event/Sound/Played), [Sound.Paused](https://developer.roblox.com/en-us/api-reference/event/Sound/Paused) and [Sound.Resumed](https://developer.roblox.com/en-us/api-reference/event/Sound/Resumed) only the respective sound function will cause the event to fire. This means that Stopped will only fire when [Sound:Stop](https://developer.roblox.com/en-us/api-reference/function/Sound/Stop) is called. Destroying a sound whilst it is playing will not cause this event to fire.
	 */
	readonly Stopped: RBXScriptSignal<(soundId: string) => void>;
}

export default interface Sound2Instance extends Sound2Properties {
    /**
	 * Plays the current Sound2 Instance. Will not stop automatically if Roblox Instance is .Looped
	 */
	Play(): void;

	/**
	 * Pauses the current Instance if playing. Can only be resumed by Sound2:Resume()
	 */
    Pause(): void;

	/**
	 * Resumes the Sound2 Instance if paused.
	 */
    Resume(): void;

	/**
	 * Stops the current Sound2 Instance if playing.
	 */
    Stop(): void;

	/**
	 * :Connect()'s the provided callback function with the Roblox Sound Instance event on creation.
	 */
    SetCallback<T extends keyof SoundEvents>(name: T, callback: () => void): void;
    
	/**
	 * Unbinds the event from a function.
	 */
	RemoveCallback<T extends keyof SoundEvents>(name: T): void;
    
	/**
	 * Sets the Sound2 Instance's volume. Respects current Sound2.VolumeChangeType
	 */
	AdjustVolume(newVolume: number): void;
}

