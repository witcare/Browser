import socket
import time

sk = socket.socket()
sk.connect(("127.0.0.1", 9008))  # 主动初始化与服务器端的连接
send_data1 = '01'
sk.sendall(bytes(send_data1, encoding="utf8"))
sk.close()


time.sleep(15)
sk = socket.socket()
sk.connect(("127.0.0.1", 9008))  # 主动初始化与服务器端的连接
send_data2 = '02'
sk.sendall(bytes(send_data2, encoding="utf8"))
sk.close()

time.sleep(15)
sk = socket.socket()
sk.connect(("127.0.0.1", 9008))  # 主动初始化与服务器端的连接
send_data3 = '03'
sk.sendall(bytes(send_data3, encoding="utf8"))
#accept_data = sk.recv(1024)
#print(str(accept_data, encoding="utf8"))
sk.close()