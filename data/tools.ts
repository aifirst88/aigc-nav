export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  icon?: string;
  category: string;
  tags: string[];
  hot?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'writing', name: 'AI写作', icon: '✍️' },
  { id: 'image', name: '图像生成', icon: '🎨' },
  { id: 'video', name: '视频创作', icon: '🎬' },
  { id: 'chat', name: '智能对话', icon: '💬' },
  { id: 'office', name: '办公效率', icon: '📊' },
  { id: 'design', name: '设计工具', icon: '🎯' },
  { id: 'music', name: '音乐语音', icon: '🎵' },
  { id: 'dev', name: '开发工具', icon: '💻' },
];

export const tools: Tool[] = [
  // 智能对话
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI开发的AI对话助手，支持多种任务',
    url: 'https://chat.openai.com',
    category: 'chat',
    tags: ['对话', '写作', '编程'],
    hot: true,
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic推出的AI助手，擅长长文本处理',
    url: 'https://claude.ai',
    category: 'chat',
    tags: ['对话', '长文本', '分析'],
    hot: true,
  },
  {
    id: 'kimi',
    name: 'Kimi',
    description: '月之暗面推出的AI助手，支持超长文本',
    url: 'https://kimi.moonshot.cn',
    category: 'chat',
    tags: ['对话', '国产', '长文本'],
    hot: true,
  },
  {
    id: 'doubao',
    name: '豆包',
    description: '字节跳动推出的AI助手',
    url: 'https://www.doubao.com',
    category: 'chat',
    tags: ['对话', '国产'],
  },
  {
    id: 'wenxin',
    name: '文心一言',
    description: '百度推出的AI对话产品',
    url: 'https://yiyan.baidu.com',
    category: 'chat',
    tags: ['对话', '国产'],
  },
  {
    id: 'tongyi',
    name: '通义千问',
    description: '阿里推出的AI对话助手',
    url: 'https://qianwen.aliyun.com',
    category: 'chat',
    tags: ['对话', '国产'],
  },
  {
    id: 'zhipu',
    name: '智谱清言',
    description: '智谱AI推出的AI助手',
    url: 'https://chatglm.cn',
    category: 'chat',
    tags: ['对话', '国产'],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Google推出的AI对话助手',
    url: 'https://gemini.google.com',
    category: 'chat',
    tags: ['对话', 'Google'],
  },
  
  // 图像生成
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: '顶级AI图像生成工具，艺术效果出色',
    url: 'https://www.midjourney.com',
    category: 'image',
    tags: ['图像', '艺术', '付费'],
    hot: true,
  },
  {
    id: 'stablediffusion',
    name: 'Stable Diffusion',
    description: '开源AI图像生成模型',
    url: 'https://stability.ai',
    category: 'image',
    tags: ['图像', '开源'],
  },
  {
    id: 'dalle',
    name: 'DALL·E 3',
    description: 'OpenAI的图像生成工具',
    url: 'https://openai.com/dall-e-3',
    category: 'image',
    tags: ['图像', 'OpenAI'],
    hot: true,
  },
  {
    id: 'tongyiwanxiang',
    name: '通义万相',
    description: '阿里推出的AI绘画工具',
    url: 'https://tongyi.aliyun.com/wanxiang',
    category: 'image',
    tags: ['图像', '国产'],
  },
  {
    id: 'jimeng',
    name: '即梦',
    description: '字节跳动的AI绘画平台',
    url: 'https://jimeng.jianying.com',
    category: 'image',
    tags: ['图像', '国产'],
  },
  {
    id: 'liblib',
    name: 'LiblibAI',
    description: '国内AI绘画社区和工具',
    url: 'https://www.liblib.art',
    category: 'image',
    tags: ['图像', '国产', '社区'],
  },
  
  // 视频创作
  {
    id: 'sora',
    name: 'Sora',
    description: 'OpenAI的文本生成视频模型',
    url: 'https://openai.com/sora',
    category: 'video',
    tags: ['视频', 'OpenAI'],
    hot: true,
  },
  {
    id: 'runway',
    name: 'Runway',
    description: 'AI视频编辑和生成平台',
    url: 'https://runwayml.com',
    category: 'video',
    tags: ['视频', '编辑'],
    hot: true,
  },
  {
    id: 'pika',
    name: 'Pika',
    description: 'AI视频生成工具',
    url: 'https://pika.art',
    category: 'video',
    tags: ['视频', '生成'],
  },
  {
    id: 'kling',
    name: '可灵',
    description: '快手的AI视频生成工具',
    url: 'https://klingai.kuaishou.com',
    category: 'video',
    tags: ['视频', '国产'],
    hot: true,
  },
  {
    id: 'hailuo',
    name: '海螺AI',
    description: 'MiniMax的视频生成工具',
    url: 'https://hailuoai.video',
    category: 'video',
    tags: ['视频', '国产'],
  },
  
  // AI写作
  {
    id: 'jasper',
    name: 'Jasper',
    description: 'AI营销文案写作工具',
    url: 'https://www.jasper.ai',
    category: 'writing',
    tags: ['写作', '营销', '付费'],
    hot: true,
  },
  {
    id: 'copyai',
    name: 'Copy.ai',
    description: 'AI文案生成工具',
    url: 'https://www.copy.ai',
    category: 'writing',
    tags: ['写作', '营销'],
  },
  {
    id: 'notionai',
    name: 'Notion AI',
    description: 'Notion内置的AI写作助手',
    url: 'https://www.notion.so/product/ai',
    category: 'writing',
    tags: ['写作', '办公'],
  },
  {
    id: 'xiezuocat',
    name: '写作猫',
    description: '秘塔写作猫，AI写作助手',
    url: 'https://xiezuocat.com',
    category: 'writing',
    tags: ['写作', '国产'],
  },
  {
    id: 'mi-3000',
    name: '秘塔写作',
    description: 'AI写作和改写工具',
    url: 'https://metaso.cn',
    category: 'writing',
    tags: ['写作', '国产'],
  },
  
  // 办公效率
  {
    id: 'tongyi-tingwu',
    name: '通义听悟',
    description: '阿里语音转文字和会议记录工具',
    url: 'https://tingwu.aliyun.com',
    category: 'office',
    tags: ['语音', '会议', '国产'],
  },
  {
    id: 'feishu',
    name: '飞书妙记',
    description: '飞书智能会议纪要工具',
    url: 'https://www.feishu.cn/product/minutes',
    category: 'office',
    tags: ['会议', '语音', '国产'],
  },
  {
    id: 'gamma',
    name: 'Gamma',
    description: 'AI演示文稿生成工具',
    url: 'https://gamma.app',
    category: 'office',
    tags: ['PPT', '演示'],
    hot: true,
  },
  {
    id: 'beautiful',
    name: 'Beautiful.ai',
    description: 'AI驱动的演示文稿设计工具',
    url: 'https://www.beautiful.ai',
    category: 'office',
    tags: ['PPT', '演示'],
  },
  
  // 设计工具
  {
    id: 'canva',
    name: 'Canva',
    description: '在线设计平台，集成AI功能',
    url: 'https://www.canva.com',
    category: 'design',
    tags: ['设计', '图形'],
  },
  {
    id: 'removebg',
    name: 'Remove.bg',
    description: 'AI自动抠图工具',
    url: 'https://www.remove.bg',
    category: 'design',
    tags: ['图像', '抠图'],
  },
  {
    id: 'clipdrop',
    name: 'Clipdrop',
    description: 'AI图像处理套件',
    url: 'https://clipdrop.co',
    category: 'design',
    tags: ['图像', '设计'],
  },
  {
    id: 'figma-ai',
    name: 'Figma AI',
    description: 'Figma的AI设计助手',
    url: 'https://www.figma.com/ai',
    category: 'design',
    tags: ['设计', 'UI'],
  },
  
  // 音乐语音
  {
    id: 'suno',
    name: 'Suno',
    description: 'AI音乐生成工具',
    url: 'https://suno.com',
    category: 'music',
    tags: ['音乐', '生成'],
    hot: true,
  },
  {
    id: 'udio',
    name: 'Udio',
    description: 'AI音乐创作平台',
    url: 'https://www.udio.com',
    category: 'music',
    tags: ['音乐', '生成'],
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'AI语音合成和克隆',
    url: 'https://elevenlabs.io',
    category: 'music',
    tags: ['语音', 'TTS'],
    hot: true,
  },
  
  // 开发工具
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'GitHub AI编程助手',
    url: 'https://github.com/features/copilot',
    category: 'dev',
    tags: ['编程', '代码', '付费'],
    hot: true,
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI原生代码编辑器',
    url: 'https://cursor.sh',
    category: 'dev',
    tags: ['编程', '编辑器'],
    hot: true,
  },
  {
    id: 'v0',
    name: 'v0.dev',
    description: 'Vercel的AI组件生成工具',
    url: 'https://v0.dev',
    category: 'dev',
    tags: ['前端', '组件'],
  },
  {
    id: 'codeium',
    name: 'Codeium',
    description: '免费AI代码补全工具',
    url: 'https://codeium.com',
    category: 'dev',
    tags: ['编程', '免费'],
  },
];
