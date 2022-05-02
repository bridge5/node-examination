/**
 * 用于写一些常用的纯函数
 */
import { map } from 'lodash';


type TKey<T extends Record<any, any>> = T extends Record<infer K, any> ? K : any;
type TVal<T extends Record<any, any>> = T extends Record<any, infer V> ? V : any;

type TMapObjFunc<T> = (v: TVal<T>, k: TKey<T>, obj: T) => any;

export const mapObjIndexed = <T extends Record<any, any>>(func: TMapObjFunc<T>, obj: T): T => {
  const result = {} as any;
  map(obj, (val: any, key: any) => {
    result[key] = func(val, key, obj)
  });
  return result;
}
