/*
 * @Description:
 * @Author: rodchen
 * @Date: 2022-01-04 11:08:33
 * @LastEditTime: 2022-01-04 20:12:30
 * @LastEditors: rodchen
 */
import print from './print';

import '../css/a.less';
import '../css/b.less';

function index() {

}

print();

if (module.hot) {
  module.hot.accept('./print.js', () => {
    // 方法会监听js文件的变化，
    print();
  });
}

export default index;
