const VARS = {
    LEFTPANE_WIDTH: 250, // マイフィードの幅
    DEFAULT_PREFETCH: 2, // デフォルトの先読み件数
    MAX_PREFETCH: 5, // 最大先読み件数
    PRINT_FEED_FIRST_NUM: 3, // 初回に描画する件数
    PRINT_FEED_DELAY: 500, // 2件目以降を描画するまでの待ち時間
    PRINT_FEED_DELAY_2: 100, // 21件目以降を描画するまでの待ち時間
    PRINT_FEED_NUM: 20, // 一度に描画する件数
    SUBS_LIMIT_1: 100, // 初回にロードするSubsの件数
    SUBS_LIMIT_2: 200, // 二回目以降にロードするSubsの件数
    USE_PARTIAL_LOAD: true,
    VIEW_MODES: ['flat', 'folder', 'rate', 'subscribers'],

    PREFETCH_TIMEOUT: 2000,
    LOCK_TIMEOUT: 2000,
};

export default VARS;
