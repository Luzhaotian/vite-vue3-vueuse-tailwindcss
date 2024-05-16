let lock = false;

/**
 * 互斥锁 处理非常理超级极端的情况（忽略不计，顺便学习而已）
 * 开始锁
 * @returns {promise}
 */
export const acquireLock = () => {
  return new Promise(resolve => {
    if (!lock) {
      lock = true;
      resolve();
    } else {
      setTimeout(resolve, 0);
    }
  });
};

/**
 * 释放锁
 */
export const releaseLock = () => {
  lock = false;
};
