/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50619
Source Host           : localhost:3306
Source Database       : user

Target Server Type    : MYSQL
Target Server Version : 50619
File Encoding         : 65001

Date: 2021-02-16 15:31:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_icelandic_ci NOT NULL DEFAULT '',
  `time` varchar(255) DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `des` varchar(255) DEFAULT '',
  `img` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '爆炒肥肠', '1613404800000', '50', '两人份', 'upload/20210216/76cbab9083ab0266272895bea9087d04.jpg');
INSERT INTO `goods` VALUES ('4', '凉拌黄瓜', '1613404800000', '12', '暂无', 'upload/20210216/155779cac9fbadcc677f711548cc5bc3.jpg');
INSERT INTO `goods` VALUES ('5', '回锅肉', '1613404800000', '30', '爆炒回锅肉', 'upload/20210216/94e1214e035a5f68305b76faf5d33c90.jpg');
INSERT INTO `goods` VALUES ('6', '辣子鸡丁', '1613404800000', '40', '', 'upload/20210216/06a329ab5adfee28a30c914302c0866d.jpg');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(5) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL,
  `username` varchar(20) NOT NULL DEFAULT '' COMMENT '账号',
  `password` varchar(15) NOT NULL DEFAULT '' COMMENT '密码',
  `type` int(1) unsigned zerofill NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('00001', '谭某', '15982275127', '123456', '1');
INSERT INTO `user` VALUES ('00002', '小柒', 'admin', '123456', '1');
INSERT INTO `user` VALUES ('00003', '测试用户', 'test', '123456', '0');
INSERT INTO `user` VALUES ('00004', '小六啊', '666666', '666666', '1');
