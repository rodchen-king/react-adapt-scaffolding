/*
 * @Description:
 * @Author: rodchen
 * @Date: 2022-01-04 20:01:58
 * @LastEditTime: 2022-01-04 20:11:38
 * @LastEditors: rodchen
 */
import print1 from './1';

console.log('print.js被加载了~');

print1();

function print() {
  const content = 'ello print';
  console.log(content);
}

export default print;
