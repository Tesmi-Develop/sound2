import { Sound2Properties, SoundEvents } from "./types";


export default interface Sound2Instance extends Omit<Sound2Properties, 'Parent'> {
	SoundObject: Sound,

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

