import Sound2Instance from "./Sound2Class";
import { Sound2Properties, SoundProperties, Sound2Config, VolumeChangeType } from "./types";

interface Sound2Constructor {
	/**
	 * Constructs the Sound2 Instance.
	 */
	new(soundObject: Sound, SoundProperties?: Partial<SoundProperties>): Sound2Instance
	
	/**
	 * Returns a copy of the current global config.
	 */
	VolumeChangeType: VolumeChangeType;

	/**
	 * Returns a table with all the currently playing Sound2 Instances.
	 */
	GetAllPlayingSounds: () => Array<Sound2Instance>;
}

declare const Sound2: Sound2Constructor;

export = Sound2;