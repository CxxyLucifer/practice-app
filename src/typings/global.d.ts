declare const System: any;

// declare const __DEV__: boolean;

declare interface FetchData {
  res: any;
  err: any;
}

/**
 * fetch返回结果;
 */
declare interface Result {
  res: Object; //返回的数据
  err: any;   //出现的异常
}

declare interface Unit {
  unit: string;
  containerUnit: string;
  unitConversionNum: number;
  buyCount: number;
}

interface ListProps{
  url:string, //搜索接口的地址
  method?:string, //POST or GET
  renderRow:Function //渲染列表的function
}

declare interface SearchProps {
  listProps:ListProps
  queryName:string, //搜索项的name
  storageKey:string //不能有下划线_
}

declare module 'dismissKeyboard' {
  export default function dismissKeyboard(): void;
}

declare module 'TextInputState' {
  export function currentlyFocusedField();
}