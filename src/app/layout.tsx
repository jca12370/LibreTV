import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: {
    default: 'LibreTV - 免费在线视频搜索与观看平台',
    template: '%s - LibreTV',
  },
  description:
    'LibreTV 是一个免费的在线视频搜索平台，无广告、安全，提供来自多个视频源的内容搜索与观看服务，无需注册即可使用。',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icons/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#0b101a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* 电视端适配：强制隐藏红圈光标、撑满全屏、禁用文字选中与边缘滚动 */}
        <style dangerouslySetInnerHTML={{ __html: `
          * {
            cursor: none !important;
          }
          html, body {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            margin: 0;
            padding: 0;
            background-color: #0b101a;
            user-select: none;
            -webkit-user-select: none;
          }
          /* 增强电视遥控器聚焦时的可视高亮提示 */
          a:focus, button:focus, [tabindex]:focus {
            outline: 3px solid #3b82f6 !important;
            outline-offset: 2px;
          }
        `}} />

        {/* 电视遥控器兼容脚本：确保 OK 键（Enter / 13 / 23）能够精准触发焦点点击 */}
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.keyCode === 13 || e.keyCode === 23) {
              var activeEl = document.activeElement;
              if (activeEl && typeof activeEl.click === 'function') {
                activeEl.click();
                e.preventDefault();
              }
            }
          });
        `}} />

        {/* 首屏前同步主题，避免亮暗闪烁 */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('libretv-theme')||'dark';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})()",
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
