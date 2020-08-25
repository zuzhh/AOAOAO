/**
 * base场景，所有场景继承这个
 * 所有的显示容器全部继承自 DisplayObjectContainer 类
 * 添加、删除子对象
 * 访问子对象
 * 检测子对象
 * 设置叠放次序（深度管理）
 */
class BaseScene extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
    }

    protected initView() {

    }
}