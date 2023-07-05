import Sound2Instance from "./Sound2Class";
import { Sound2Constructor } from "./Sound2Class";

declare global {
	interface SoundsDictionary {}
}

export declare interface Sound2Config {
    LoadingTimeout: number,
	SoundRemovalDelay: number,
	ParentObject: Instance,
	SoundsDictionary: SoundsDictionary,
}

export interface Sound2Properties {
	SoundId: string,
	Priority: number,
	VolumeChangeType: number,
	VolumeChangeTime: number,
	Volume: number,
	MuteOthers: boolean,
	StartDelay: number,
	MutedVolume: number,
	Parent: Instance,
}

export interface SoundProperties {
	Archivable: boolean;
	Name: string;
	Parent: Instance;
	PlayOnRemove: boolean;
	RollOffMaxDistance: number;
	RollOffMinDistance: number;
	RollOffMode: Enum.RollOffMode;
	Looped: boolean;
	PlaybackRegionsEnabled: boolean;
	PlaybackSpeed: number;
	Playing: boolean;
	TimePosition: number;
	SoundGroup: SoundGroup;
}

export interface VolumeChangeType {
    Smooth: number;
	Instant: number;
}

interface Sound2 extends Sound2Constructor {

	/**
	 * A Table that represents VolumeChangeType Enum.
	 */
    VolumeChangeType: VolumeChangeType;

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

export declare const Sound2: Sound2;
