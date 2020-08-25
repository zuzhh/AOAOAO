/**
 * 游戏工具类，获取图片、舞台宽高等
 */
class GameUtil {

    /**
     * 获取舞台高度
     */
    public static getStageHeight(): number {
        return egret.MainContext.instance.stage.stageHeight;
    }

    /**
     * 获取舞台宽度
     */
    public static getStageWidth(): number {
        return egret.MainContext.instance.stage.stageWidth;
    }

    /**
     * 根据name关键字创建一个Bitmap（位图）对象。name属性请参考resources/resource.json配置文件的内容。
     */
    public static createBitmapByName(name: string, type: string = 'png') {
        // 创建一个位图对象 该位图对象仅仅是一个“空对象”，还没有为它指定任何的纹理
        let result = new egret.Bitmap();
        // 获取纹理图片资源
        let texture: egret.Texture = RES.getRes(name + '_' + type);
        // 为位图对象指定一个纹理
        result.texture = texture;
        return result;
    }

    /**
     * 根据name关键字创建一个MovieClip（序列帧动画）对象。name属性请参考resources/resource.json配置文件的内容。
     * egret 的 MovieClip 采用工厂模式，MovieClip 工厂类为： MovieClipDataFactory
     * MovieClip 工厂类对应一个MC资源合集，需要一对 json 配置文件和一个纹理集图片
     */
    public static createMovieClipByName(name: string): egret.MovieClip {
        // json 配置文件
        let data_stay: any = RES.getRes(name + '_json');
        console.log(data_stay);
        // 获取纹理集图片资源
        let texture_stay: egret.Texture = RES.getRes(name + '_png');
        // 解析到一个 MovieClip 工厂类
        let mcFactory_stay: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data_stay, texture_stay);
        // 解析MovieClip 获取动作
        return new egret.MovieClip(mcFactory_stay.generateMovieClipData(name));
    }

    /**
     * 组件添加点击缩放效果（类似按钮）
     */
    public static bitmapToBtn(bitmap: egret.Bitmap, callback) {
        bitmap.touchEnabled = true;
        // 记录当前位置
        const source: Point = new Point(bitmap.x, bitmap.y);
        // 监听触摸事件
        bitmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            // 改变按钮的锚点
            bitmap.anchorOffsetX = bitmap.width / 2;
            bitmap.anchorOffsetY = bitmap.height / 2;
            // 改变按钮位置（因为锚点变了）
            bitmap.x = source.x + bitmap.width / 2;
            bitmap.y = source.y + bitmap.height / 2;
            bitmap.scaleX = 0.95;
            bitmap.scaleY = 0.95;
        }, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            reset();
            // 这个事件发生才算是点击按钮
            callback && callback();
        }, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_CANCEL, reset, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_END, reset, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, reset, this);
        function reset() {
            bitmap.anchorOffsetX = 0;
            bitmap.anchorOffsetY = 0;
            bitmap.x = source.x;
            bitmap.y = source.y;
            bitmap.scaleX = 1;
            bitmap.scaleY = 1;
        }
    }
}