const Sequelize = require('sequelize')
const { STRING, INTEGER, BIGINT, TEXT } = Sequelize

// 自定义私有字段类型
const privateTypes = {
  Mobile: () => ({
    type: BIGINT,
    validate: {
      is: /^1[3456789]\d{9}$/i
    }
  }),
  Url: () => ({
    type: STRING,
    validate: {
      isUrl: true
    }
  }),
  Email: () => ({
    type: STRING,
    validate: {
      isEmail: true
    }
  }),
  Date: () => ({
    type: BIGINT,
    defaultValue: () => +new Date()
  }),
  Hits: () => ({
    type: INTEGER,
    defaultValue: 0
  }),
  Sort: () => ({
    type: INTEGER,
    defaultValue: 0
  }),
  Status: () => ({
    type: STRING,
    defaultValue: 'NORMAL'
  }),
  Editor: () => ({
    type: STRING,
    defaultValue: 'MARKDOWN'
  })
}

/*
  所有表字段名使用小写，模型名称允许大小写
  表字段不允许使用中划线 如 my-love 是非法的
    可用下划线替代 如 my_love 是合法的
*/
module.exports = {
  Dicts: {
    pid: privateTypes.Hits(),
    key: STRING,
    en: TEXT,
    zh: TEXT,
    ja: TEXT,
    fr: TEXT,
    ko: TEXT,
    es: TEXT,
    tr: TEXT,
    mark: TEXT,
    node: privateTypes.Hits(),
    time: privateTypes.Date()
  },
  // 超级管理员
  Manages: {
    account: STRING, // 超级管理员账号
    password: TEXT, // 超级管理员密码
    salt: TEXT,
    name: STRING, // 姓名
    avatar: STRING, // 头像
    mark: TEXT,
    editor: privateTypes.Editor(),
    mobile: privateTypes.Mobile(),
    email: privateTypes.Email(),
    time: privateTypes.Date()
  },
  // 站点基本信息配置
  Site: {
    name: STRING, // 站点名称
    title: STRING, // 站点标题
    logo: STRING, // 站点 logo
    keywords: TEXT, // 站点关键词
    description: TEXT, // 站点描述
    copyright: TEXT, // 站点版权
    time: privateTypes.Date()
  },
  // 文章编辑
  Editor: {
    account: STRING,
    password: TEXT,
    salt: TEXT,
    name: STRING,
    avatar: STRING,
    mark: TEXT,
    editor: privateTypes.Editor(),
    mobile: privateTypes.Mobile(),
    email: privateTypes.Email(),
    website: privateTypes.Url(),
    time: privateTypes.Date()
  },
  Languages: {
    name: STRING,
    code: STRING,
    text: TEXT,
    time: privateTypes.Date()
  }
}
