-- a udp client
pin = 7
gpio.mode(pin, gpio.INPUT)
status = gpio.read(pin)

xaxis = 2 --4
yaxis = 1 --5
x1 = 0 --xaxis of tilt
y1 = 0 --yaxis of tilt
flagx = 0 --prev x value
flagy = 0 --prev y value
count = 0 --# counter for door opening
flag = 0
port = 1023
ip = "192.168.1.139"
gpio.mode(xaxis, gpio.INPUT)
gpio.mode(yaxis, gpio.INPUT)


if (status == 1) then --If pin 7 is set to high and module is reset program do not start
	tmr.alarm(2, 1000, 1, function()  --repeat code every 1 second
		x1 = gpio.read(yaxis)
		y1 = gpio.read(yaxis)

		if((x1 ~= flagx) or (y1 ~= flagy)) then --if tilt sensor changes state counter inc
			count = 1
		else
			count = 0
		end

		--assign prev value
		flagx = x1
		flagy = y1

		print(count)


		if(count == 1 and flag == 1) then --if one prev value is different send message
			print("starting connection")
			cu=net.createConnection(net.UDP)
			cu:on("receive", function(cu, c) print(c) end)
			cu:connect(port, ip)
			cu:send("1")
			print(wifi.sta.getip())
			print("test command sent")
		end
		flag = 1
	end)
end
