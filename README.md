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
<img width="707" alt="Screenshot 2025-01-20 at 07 32 17" src="https://github.com/user-attachments/assets/001dc715-247d-4dae-9f22-ff92cf2ad63b" />


---

## 3. How to download the project

1. Access the link: [https://github.com/BlossomAnukposi/DataProcessing](https://github.com/BlossomAnukposi/DataProcessing)

   After accessing the link, this is the screen you should see:
   
   <img width="627" alt="Screenshot 2025-01-20 at 07 31 42" src="https://github.com/user-attachments/assets/b75b64e7-11f2-4fa1-89b1-2510506a02a5" />
   

3. Next step is to click on the green button named `CODE`, then click on “Download ZIP”:

   <img width="627" alt="Screenshot 2025-01-20 at 07 31 36" src="https://github.com/user-attachments/assets/85e7ab09-82f0-4ba9-8a01-76b755f57245" />
   

4. After downloading, go to the file explorer and in the folder where you downloaded your project. Right-click on the folder and select **Extract All**:

<img width="627" alt="Screenshot 2025-01-20 at 07 31 27" src="https://github.com/user-attachments/assets/2bea0df0-498d-47f1-9b3d-410c06ed36b6" />

5. After selecting **Extract All**, you will see this screen (look below) and click **Extract**:

<img width="627" alt="Screenshot 2025-01-20 at 07 31 22" src="https://github.com/user-attachments/assets/4b4f312f-acf5-4579-a49d-c651ded874cd" />

---

## 4. How to run the project

1. First, open Visual Studio Code (VS Code), and then click on the **Explorer** icon marked with an arrow.

<img width="627" alt="Screenshot 2025-01-20 at 07 30 58" src="https://github.com/user-attachments/assets/b8419f2f-341a-496d-9ba7-c4d4ce09a1ad" />

3. Select **Open Folder**:

<img width="597" alt="Screenshot 2025-01-20 at 07 30 50" src="https://github.com/user-attachments/assets/1f1c9d76-0104-4b73-971e-470324f290e0" />

5. Select the `DataProcessing` folder:

<img width="627" alt="Screenshot 2025-01-20 at 07 30 38" src="https://github.com/user-attachments/assets/d6363e45-a03c-415d-92d2-7a507c5e7905" />

7. Once the folder is selected, press on the **Terminal** option.

<img width="627" alt="Screenshot 2025-01-20 at 07 30 29" src="https://github.com/user-attachments/assets/d0f124e8-143a-4744-aad7-0e440c672d90" />

9. Click on **New Terminal**:

<img width="627" alt="Screenshot 2025-01-20 at 07 30 22" src="https://github.com/user-attachments/assets/d2661f0c-e12f-497c-92e3-d0de370f122e" />

11. In the terminal, type the following command and hit Enter:

<img width="627" alt="Screenshot 2025-01-20 at 07 30 12" src="https://github.com/user-attachments/assets/056555fa-660a-4d83-a32e-aae36f871ead" />
   npm init -y


13. Then, type the following command to install dependencies:

<img width="627" alt="Screenshot 2025-01-20 at 07 30 04" src="https://github.com/user-attachments/assets/481c3e42-5577-4a6a-b1bd-a64efda40569" />

npm install

15. If you encounter errors similar to the image below, you can run:

<img width="627" alt="Screenshot 2025-01-20 at 07 29 55" src="https://github.com/user-attachments/assets/db119f92-361d-4642-8338-25a066dcaede" />

npm install --legacy-peer-deps

(Screenshot of npm install error)

9. To run the project now, type the following command:
node server.js

<img width="318" alt="Screenshot 2025-01-20 at 07 29 45" src="https://github.com/user-attachments/assets/096577fc-bd77-4370-9c10-1d0a382fc281" />

(Screenshot of terminal with node server.js)

To access the frontend go into to DataProcessing folder and enter in com.nhlstenden folder

<img width="629" alt="Screenshot 2025-01-20 at 07 29 34" src="https://github.com/user-attachments/assets/dace5b81-3646-4480-86c1-c5afcde705aa" />

After that access the views folder

<img width="629" alt="Screenshot 2025-01-20 at 07 29 27" src="https://github.com/user-attachments/assets/e2cc33a0-04f3-46d0-91c6-6d4a2e367fc3" />

Then open the signUp.html

<img width="629" alt="Screenshot 2025-01-20 at 07 29 21" src="https://github.com/user-attachments/assets/e4dfa3ed-514e-488a-9523-dd9098758ab3" />

Last part is to create an account and press Sign up

<img width="629" alt="Screenshot 2025-01-20 at 07 29 12" src="https://github.com/user-attachments/assets/02fb3a80-6a97-46d0-ba30-9260c03ebb36" />

## PLEASE NOTE!!!
There are two test files. One is a .json (contract test.json) file that can be imported into postman, the other can be run directly in the api environment (right click test folder and click run tests in folder)

## Database
To connect to the postgreSQL database, download pgAdmin and use these values to connect. The database we use is api-structure

<img width="602" alt="Screenshot 2025-01-20 at 11 06 56" src="https://github.com/user-attachments/assets/967d5176-8d2d-40c9-9460-d1a507a1fb78" />

### connection details:
PGHOST=netflix-ms-db.postgres.database.azure.com
export PGUSER=NetflixAdmin
export PGPORT=5432
export PGDATABASE=api-structure
export PGPASSWORD="Special-Cookie"
