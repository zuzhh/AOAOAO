/**
 * 场景控制器
 */
class SceneController {

    private _stage: egret.DisplayObjectContainer // 场景容器

    private startScene: StartScene // 开始场景
    private playScene: PlayScene // 游戏场景
    private endScene: EndScene // 结束场景

    public static sceneController: SceneController
    
    public static get instance() {
        if (!this.sceneController) {
            this.sceneController = new SceneController()
        }
        return this.sceneController
    }

    /**
     * 设置存放游戏场景的容器
     */
    public setStage(stage: egret.DisplayObjectContainer) {
        this._stage = stage;
    }

    /**
     * 初始化游戏，显示开始游戏场景
     */
    public static initGame() {
        let stage: egret.DisplayObjectContainer = this.instance._stage;
        if(this.instance.playScene.parent) {
            // 如果有游戏场景，移除掉
            stage.removeChild(this.instance.playScene);
            this.instance.playScene = new PlayScene();
        }
        if(this.instance.endScene.parent) {
            // 如果有游戏场景，移除掉
            stage.removeChild(this.instance.endScene);
            this.instance.endScene = new EndScene();
        }
        // 添加开始场景
        stage.addChild(this.instance.startScene)
    }

    /**
     * 显示游戏场景
     */
    public static showPlayScene() {
        let stage: egret.DisplayObjectContainer = this.instance._stage
        if (this.instance.startScene.parent) {
            stage.removeChild(this.instance.startScene)
            this.instance.startScene = new StartScene()
        }
        if (this.instance.endScene.parent) {
            stage.removeChild(this.instance.endScene)
            this.instance.endScene = new EndScene()
        }
        if (this.instance.playScene.parent) {
            stage.removeChild(this.instance.playScene)
            this.instance.playScene = new PlayScene()
        }
        let level = n.GameData.level
        if (level >= n.GameData.levelData.length) { // 关卡超过已有的，那就直接用最后一关（也就是到了后面难度都是几乎一样的），避免数组越界
            level = n.GameData.levelData.length - 1
        }
        // 设置关卡对应的数据
        n.GameData.barrierNumber = n.GameData.levelData[level].barrierNumber
        n.GameData.row = n.GameData.levelData[level].row
        n.GameData.col = n.GameData.levelData[level].col
        // 重置游戏步数为0
        n.GameData.step = 0
        n.GameData.overType = OverType.NULL
        stage.addChild(this.instance.playScene)
    }
    
}