/**
 * 处理段落信息
 */
export interface PassageInfo {
    passageName: string;    // 段落名称 - :: PASSAGE_NAME
    passageBody: string;    // 段落内容，不含段落名称
    passageFull: string;    // 包含段落名称的整个段落
    passageType?: string;   // 段落类型 - 方括号中的内容
    filepath: string;       // 段落所在的文件路径
    filename: string;       // 段落所在的文件名
}

export type AllPassageInfo = PassageInfo[];
export type GetAllPassageReturn = [string[], PassageInfo[]];

/**
 * 处理函数信息
 */
export interface WidgetInfo {
    passageName: string;    // 定义所在的段落名称
    widgetName: string;     // 函数名称
    isNeededClose: boolean; // 是否需要闭合
    filepath: string;       // 定义所在的文件路径
    filename: string;       // 定义所在的文件名
}

export type AllWidgetInfo = WidgetInfo[]
