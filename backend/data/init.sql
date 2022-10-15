CREATE DATABASE IF NOT EXISTS pmarket;
USE pmarket;

# 用户表
DROP TABLE IF EXISTS user;
CREATE TABLE user
(
    user_id    VARCHAR(255) PRIMARY KEY NOT NULL, # 用户id
    wechat_id  VARCHAR(255)             NOT NULL, # 微信id
    passwd     VARCHAR(255)             NOT NULL, # 密码
    avatar     MEDIUMBLOB               NOT NULL, # 头像，2MB以内
    nickname   VARCHAR(255)             NOT NULL  # 用户昵称
);


# 售卖信息表
DROP TABLE IF EXISTS message;
CREATE TABLE message
(
    msg_id      INT PRIMARY KEY NOT NULL, # 售卖信息id
    description VARCHAR(1023)   NOT NULL, # 描述信息
    contact     VARCHAR(255)    NOT NULL, # 联系方式
    picture     MEDIUMBLOB      NOT NULL, # 图片，16MB以内
    msg_class   INT             NOT NULL  # 商品大类别（1书籍，2日用，3数码）
);

# 商品表
DROP TABLE IF EXISTS goods;
CREATE TABLE goods
(
    msg_id          INT             NOT NULL, # 所属售卖信息id
    goods_id        INT             NOT NULL, # 商品id
    name            VARCHAR(255)    NOT NULL, # 商品名称
    goods_class     INT             NOT NULL, # 商品小类别（0无细分，1数学，2计算机，3物理）
    price           DECIMAL(7,2)    NOT NULL, # 价格小于100000元
    state           INT             NOT NULL, # 商品状态（1有货，2已有人要，3已售出）
    PRIMARY KEY (msg_id, goods_id)
);

# 发布表
DROP TABLE IF EXISTS `release`;
CREATE TABLE `release`
(
    msg_id      INT PRIMARY KEY NOT NULL, # 售卖信息id
    user_id     VARCHAR(255)    NOT NULL  # 所属用户id
);

# 收藏表
DROP TABLE IF EXISTS star;
CREATE TABLE star
(
    msg_id      INT             NOT NULL, # 售卖信息id
    user_id     VARCHAR(255)    NOT NULL, # 收藏的用户id
    PRIMARY KEY (msg_id, user_id)
);