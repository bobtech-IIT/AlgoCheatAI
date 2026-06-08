# Connect to a WebDAV Server on macOS

Source: https://developer.puter.com/tutorials/connect-webdav-macos/

[Tutorials](/tutorials/)

# Connect to a WebDAV Server on macOS

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 4, 2026
                                    

On this page[1. Open the Connect to Server Dialog](#1-open-the-connect-to-server-dialog)[2. Enter the WebDAV Server Address](#2-enter-the-webdav-server-address)[3. Enter Your Credentials](#3-enter-your-credentials)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to connect to a WebDAV server on macOS. WebDAV lets you access files from a remote server as if they were local files on your Mac.

We'll use [Puter's](https://puter.com/) WebDAV server as an example, but these steps work with any WebDAV server.

## 1. Open the Connect to Server Dialog

Open Finder, then from the menu bar select  **Go > Connect to Server**  (or press `âK`).

![Finder menu showing Go > Connect to Server](/assets/img/webdav/finder.webp)

## 2. Enter the WebDAV Server Address

In the dialog that appears, enter the URL of your WebDAV server and click  **Connect** .

![Connect to Server dialog with WebDAV URL](/assets/img/webdav/connect.webp)

For Puter, use: `https://dav.puter.com/<username>` (replace `<username>` with your Puter username).

## 3. Enter Your Credentials

When prompted, enter your username and password, then click  **Connect** .

![Authentication dialog for WebDAV credentials](/assets/img/webdav/auth.webp)

You can check  **Remember this password in my keychain**  to avoid entering it again.

## Conclusion

That's it! You can now access your WebDAV files directly from Finder. Any changes you make sync automatically with the remote server.

Want your own cloud storage accessible via WebDAV? [Create a free Puter account](https://puter.com/) and connect using the steps above.

## Related

- [Access Your Puter Files From Any Device](/tutorials/access-puter-files-from-any-device)
- [Connect to a WebDAV Server on Windows](/tutorials/connect-webdav-windows)