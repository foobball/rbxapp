declare type StudioApplicationPaths = {
    launcher: string;
    application: string;
    root: string;
    content: string;
    plugins: string;
    appdata: string;
};
declare class RobloxStudio {
    private readonly platform;
    private readonly registry?;
    constructor();
    private __locate_win32;
    locate(verifyPaths?: boolean): Promise<StudioApplicationPaths>;
}
export default RobloxStudio;
