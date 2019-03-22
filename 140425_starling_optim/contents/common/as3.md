# おまけ：FlashのAway3Dに読み込む方法
***

```actionscript
public class FireEffect extends ObjectContainer3D
{
	private var particleGroup:ParticleGroup;

	public function FireEffect()
	{
	    loadAsset();
	}

	private function loadAsset():void
	{
		AssetLoader.enableParser(ParticleGroupParser);
		// エフェクトファイルの読み込み
		var loader:AssetLoader = new AssetLoader();
		loader.addEventListener(AssetEvent.ASSET_COMPLETE, onAssetCompleteHandler);
		loader.load(new URLRequest("effect_file.awp"));
		// または
		loader.loadData(new EmbedEffect(), "effect");
	}

	// エフェクトファイル読み込み後の処理
	private function onAssetCompleteHandler(e:AssetEvent):void
	{
		if (e.asset.assetType == AssetType.CONTAINER && e.asset is ParticleGroup)
		{
			particleGroup = e.asset as ParticleGroup;
			// 表示に追加
			addChild(particleGroup);
			// アニメーションをスタート
			particleGroup.animator.start();
		}
	}
}

```