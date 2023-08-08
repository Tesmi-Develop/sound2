import Sound2Instance from "./Sound2Class";
import { Sound2Properties, SoundProperties, Sound2Config } from "./types";

interface Sound2Constructor {

	SoundsDictionary: { };

	/**
	 * Constructs the Sound2 Instance.
	 */
	new<T extends string = string>(Sound2Properties?: Partial<Sound2Properties<T>>, SoundProperties?: Partial<SoundProperties>): Sound2Instance
	
	/**
	 * Returns a copy of the current global config.
	 */
	GetGlobalConfig: () => Sound2Config;

	/**
	 * Sets the current global config.
	 */
	SetGlobalConfig: (config: Partial<Sound2Config>) => void;

	/**
	 * Returns a table with all the currently playing Sound2 Instances.
	 */
	GetAllPlayingSounds: () => Array<Sound2Instance>;
}

declare const Sound2: Sound2Constructor;

export = Sound2;