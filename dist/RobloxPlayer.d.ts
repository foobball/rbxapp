declare type PlayerApplicationPaths = {
    launcher: string;
    application: string;
    root: string;
    content: string;
    appdata: string;
};
declare class RobloxPlayer {
    private readonly platform;
    private readonly registry?;
    constructor();
    private __locate_win32;
    locate(verifyPaths?: boolean): Promise<PlayerApplicationPaths>;
}
export default RobloxPlayer;
