import sys
import os
import socket
import time
import threading
from threading import Timer

from PyQt5 import QtWidgets, QtCore
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWebKitWidgets import *
from PyQt5.QtWidgets import *


# 继承QThread
class Runthread(QtCore.QThread):
    # python3,pyqt5与之前的版本有些不一样
    #  通过类成员对象定义信号对象
    _signal = pyqtSignal(str)
 
    def __init__(self, parent=None):
        super(Runthread, self).__init__()
 
    def __del__(self):
        self.wait()
 
    def run(self):
        # 处理你要做的业务逻辑，这里是通过一个回调来处理数据，这里的逻辑处理写自己的方法
        # wechat.start_auto(self.callback)
        # time.sleep(10)        
        # print('Run thread:', time.strftime('%H:%M:%S'))
        # self._signal.emit(time.strftime('%H:%M:%S'))  # 可以在这里写信号焕发
        try:
            #print('Start socket:', time.strftime('%H:%M:%S'))
            sk = socket.socket()
            sk.bind(("127.0.0.1", 9008))
            #print('Start listen:', time.strftime('%H:%M:%S'))
            sk.listen(5)
            #print('Start while :', time.strftime('%H:%M:%S'))
            while True:
                #print('Start accept :', time.strftime('%H:%M:%S'))
                conn, addr = sk.accept()
                while True:
                    accept_data = str(conn.recv(1024), encoding="utf8")
                    print("".join(["接收内容：", accept_data, "     客户端口：", str(addr[1])]))
                    self._signal.emit(accept_data) 
                    # if accept_data == "byebye":  # 如果接收到“byebye”则跳出循环结束和第一个客户端的通讯，开始与下一个客户端进行通讯
                    break
                    # send_data = input("输入发送内p容：")
                    # conn.sendall(bytes(send_data, encoding="utf8"))
                conn.close()  # 跳出循环时结束通讯
        except Exception as e:
            print('Run Runthread error:', e.message)
                
       
        
        
class MainWebApp(QMainWindow):
    # noinspection PyUnresolvedReferences
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # 设置窗口标题
        self.setWindowTitle('维康精益制造机器人')
        # 设置窗口图标
        self.setWindowIcon(QIcon('icons/penguin.png'))

        # 设置窗口大小900*600
        self.resize(1024, 768)
        

        # 设置浏览器
        self.browser = QWebView()
        # path1 = os.getcwd()
        # print(path1)
        # url = QUrl('http://www.baidu.com')
        # url = QUrl('file:///' + path1 + '/www/index.html')
        # self.browser.setUrl(url)
        
        # 添加浏览器到窗口中
        self.setCentralWidget(self.browser)

        if False:
            ###使用QToolBar创建导航栏，并使用QAction创建按钮
            # 添加导航栏
            navigation_bar = QToolBar('Navigation')
            # 设定图标的大小
            navigation_bar.setIconSize(QSize(16, 16))
            # 添加导航栏到窗口中
            self.addToolBar(navigation_bar)

            # QAction类提供了抽象的用户界面action，这些action可以被放置在窗口部件中
            # 添加前进、后退、停止加载和刷新的按钮
            back_button = QAction(QIcon('icons/back.png'), 'Back', self)
            next_button = QAction(QIcon('icons/next.png'), 'Forward', self)
            stop_button = QAction(QIcon('icons/cross.png'), 'stop', self)
            reload_button = QAction(QIcon('icons/renew.png'), 'reload', self)

            back_button.triggered.connect(self.browser.back)
            next_button.triggered.connect(self.browser.forward)
            # stop_button.triggered.connect(self.browser.stop)
            stop_button.triggered.connect(self.test_run_javascript)
            reload_button.triggered.connect(self.browser.reload)

            # 将按钮添加到导航栏上
            navigation_bar.addAction(back_button)
            navigation_bar.addAction(next_button)
            navigation_bar.addAction(stop_button)
            navigation_bar.addAction(reload_button)

            # 添加URL地址栏
            self.urlbar = QLineEdit()
            # 让地址栏能响应回车按键信号
            self.urlbar.returnPressed.connect(self.navigate_to_url)

            navigation_bar.addSeparator()
            navigation_bar.addWidget(self.urlbar)

            # 让浏览器相应url地址的变化
            self.browser.urlChanged.connect(self.renew_urlbar)
        #self.show()

    def go(self,turl):
        q = QUrl(turl)
        #if q.scheme() == '':
        #    q.setScheme('http')
        # 将当前网页的链接更新到地址栏
         # self.urlbar.setText(turl)
         # self.urlbar.setCursorPosition(0)
        self.browser.setUrl(q)
        #self.browser.load(QUrl(url))
        #self.browser.reload

    def runscript(self,js):
        #L.acquire()
        try:
            self.browser.page().currentFrame().evaluateJavaScript(js)
        except Exception as e:
            print('Run javascript error:', e.message)
            
        #L.release()
        #self.browser.page().currentFrame().documentElement().evaluateJavaScript(js)
        #self.browser.page().currentFrame().evaluateJavaScript(js)
        #self.browser.page().mainFrame().documentElement().evaluateJavaScript(js)
        #self.browser.page().runJavaScript(js)
        #self.browser.load(QUrl(url));
        
    def navigate_to_url(self):
        q = QUrl(self.urlbar.text())
        if q.scheme() == '':
            q.setScheme('http')
        self.browser.setUrl(q)

    def renew_urlbar(self, q):
        # 将当前网页的链接更新到地址栏
        self.urlbar.setText(q.toString())


def doWaiting(msg):
    try:
        # print('start waiting:', time.strftime('%H:%M:%S'))
        webapp.runscript('RunWebAppCommand("'+msg+'")')
        # print('end waiting:', time.strftime('%H:%M:%S'))
        # url='http://www.baidu.com'
        # webapp.go(url)
    except Exception as e:
        print('start waiting error:', e.message)
        
            
def hello():
    print('hello:', time.strftime('%H:%M:%S'))
    time.sleep(10)
    try:
        print('start hello:', time.strftime('%H:%M:%S'))
        webapp.go('http://www.163.com')
        #webapp.runscript('RunWebAppCommand("'+msg+'")')
    except Exception as e:
        print('hello error:', e.message)
            
            
# 创建应用
app = QApplication(sys.argv)
# L = threading.Lock()
# 创建主窗口
webapp = MainWebApp()
path1 = os.getcwd()
# print(path1)
# url = QUrl('http://www.baidu.com')
url = 'file:///' + path1 + '/www/index.html'
# url='http://www.baidu.com'
webapp.go(url)

webapp.show()
webapp.showFullScreen()
# 显示窗口
#window.show()
#time.sleep(10)
#webapp.go('http://www.163.com')

#thread1 = threading.Thread(target = doWaiting)
#thread1 = threading.Thread(target = doWaiting,args=(webapp,))
#thread1 = threading.Thread(target = startServer)
#thread1.start()

# 创建线程
thread = Runthread()
# 连接信号
thread._signal.connect(doWaiting)
# 开始线程
thread.start()
        
#t = Timer(20, hello)
#t.start() # 10秒钟之后执行hello函数。

# 运行应用，并监听事件
app.exec_()
