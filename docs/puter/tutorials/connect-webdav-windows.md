# Connect to a WebDAV Server on Windows

Source: https://developer.puter.com/tutorials/connect-webdav-windows/

[Tutorials](/tutorials/)

# Connect to a WebDAV Server on Windows

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 4, 2026
                                    

On this page[1. Open the Map Network Drive Dialog](#1-open-the-map-network-drive-dialog)[2. Enter the WebDAV Server Address](#2-enter-the-webdav-server-address)[3. Enter Your Credentials](#3-enter-your-credentials)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to connect to a WebDAV server on Windows. WebDAV lets you access files from a remote server as if they were local files on your PC.

We'll use [Puter's](https://puter.com/) WebDAV server as an example, but these steps work with any WebDAV server.

## 1. Open the Map Network Drive Dialog

Open File Explorer and navigate to  **This PC** . Click the three dots  **â¯**  in the toolbar, then select  **Map network drive** .

![File Explorer showing This PC with Map network drive menu](/assets/img/webdav/windows-this-pc.webp)

## 2. Enter the WebDAV Server Address

In the dialog that appears, enter the URL of your WebDAV server in the  **Folder**  field, then click  **Finish** .

![Map Network Drive dialog asking for folder path](/assets/img/webdav/windows-folder.webp)

For Puter, use: `https://dav.puter.com/<username>` (replace `<username>` with your Puter username).

## 3. Enter Your Credentials

When prompted, enter your username and password, then click  **OK** .

![Windows credentials dialog for WebDAV](/assets/img/webdav/windows-credentials.webp)

You can check  **Remember my credentials**  to avoid entering them again.

## Conclusion

That's it! Your WebDAV server now appears in File Explorer under  **This PC** . Any changes you make sync automatically with the remote server.

Want your own cloud storage accessible via WebDAV? [Create a free Puter account](https://puter.com/) and connect using the steps above.

## Related

- [Access Your Puter Files From Any Device](/tutorials/access-puter-files-from-any-device)
- [Connect to a WebDAV Server on macOS](/tutorials/connect-webdav-macos)