# Table of Contents

- [Introduction](#introduction)
- [2. Install the necessary tools](#install-the-necessary-tools)
  - [How to install Visual Studio Code](#how-to-install-visual-studio-code)
  - [How to install Node.js](#how-to-install-nodejs)
- [3. How to download the project](#how-to-download-the-project)
- [4. How to run the project](#how-to-run-the-project)

---

## Introduction

This document provides detailed work instructions for setting up and running the API Project as part of the coursework at NHL Stenden University of Applied Sciences. The instructions cover all the essential steps required to install the necessary tools, such as Visual Studio Code, Node.js, and relevant API testing tools, download the project files, and execute both the backend API and any associated frontend components of the project.

The instructions are structured to be clear and accessible, with step-by-step processes supported by visual aids, links to resources, and practical tips to address common issues. By following this guide, users will be able to set up the development environment and begin working on the API Project seamlessly.

---

## 2. Install the necessary tools

### How to install Visual Studio Code:

To install Visual Studio Code follow the YouTube link:

[YouTube Installation Guide](https://www.youtube.com/watch?v=cu_ykIfBprI)

Also, the link for VS Code:

[Download Visual Studio Code](https://code.visualstudio.com/Download)

### How to install Node.js:

To install Node.js follow the YouTube link:

[YouTube Installation Guide](https://www.youtube.com/watch?v=4FAtFwKVhn0)

Also, the link for Node.js:

[Download Node.js](https://nodejs.org/en/download)

For a better understanding, you can find in the picture below where you can press to download Node JS. Don’t forget to get the last LTS Version.

---

## 3. How to download the project

1. Access the link: [https://github.com/BlossomAnukposi/DataProcessing](https://github.com/BlossomAnukposi/DataProcessing)

   After accessing the link, this is the screen you should see:

   ![Screenshot of GitHub repository](image_path_here) *(Screenshot of GitHub repository)*

2. Next step is to click on the green button named `CODE`, then click on “Download ZIP”:

   ![Screenshot of Download ZIP option](image_path_here) *(Screenshot of download button)*

3. After downloading, go to the file explorer and in the folder where you downloaded your project. Right-click on the folder and select **Extract All**:

   ![Screenshot of Extract option](image_path_here) *(Screenshot of extraction step)*

4. After selecting **Extract All**, you will see this screen (look below) and click **Extract**:

   ![Screenshot of Extraction window](image_path_here) *(Screenshot of extraction window)*

---

## 4. How to run the project

1. First, open Visual Studio Code (VS Code), and then click on the **Explorer** icon marked with an arrow.

   ![Screenshot of VS Code explorer](image_path_here) *(Screenshot of VS Code explorer)*

2. Select **Open Folder**:

   ![Screenshot of Open Folder option](image_path_here) *(Screenshot of Open Folder option)*

3. Select the `DataProcessing` folder:

   ![Screenshot of folder selection](image_path_here) *(Screenshot of folder selection)*

4. Once the folder is selected, press on the **Terminal** option.

   ![Screenshot of Terminal](image_path_here) *(Screenshot of terminal option)*

5. Click on **New Terminal**:

   ![Screenshot of New Terminal](image_path_here) *(Screenshot of New Terminal option)*

6. In the terminal, type the following command and hit Enter:

   ```bash
   npm init -y
7. Then, type the following command to install dependencies:

```bash
Copy
Edit
npm install

8. If you encounter errors similar to the image below, you can run:

```bash
Copy
Edit
npm install --legacy-peer-deps

(Screenshot of npm install error)

9. To run the project now, type the following command:

```bash
Copy
Edit
node server.js

(Screenshot of terminal with node server.js)

