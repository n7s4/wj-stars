import Mock from "mockjs"
Mock.mock('/api/test', 'get', () => {
  return {
    error: 0,
    data: {
      name: `文殊${Date.now()}`
    }
  }
})