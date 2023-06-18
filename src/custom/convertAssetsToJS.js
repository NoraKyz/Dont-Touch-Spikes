const fs = require("fs");
const path = require("path");

const baseFolderPath = "./assets/images/";

const result = {};

const readAssets = (folderPath, parentFolderName, callback) => {
  fs.readdir(folderPath, { withFileTypes: true }, (err, entries) => {
    if (err) {
      console.error("Lỗi khi đọc thư mục:", err);
      callback(err);
      return;
    }

    entries.forEach((entry) => {
      const entryPath = path.join(folderPath, entry.name);

      if (entry.isDirectory()) {
        readAssets(entryPath, entry.name, callback);
      } else if (entry.isFile() && path.extname(entry.name) === ".png") {
        const assetName = path.basename(entry.name, ".png");
        const assetPath = "./" + entryPath.replace(/\\/g, "/");

        if (!result[parentFolderName]) {
          result[parentFolderName] = {};
        }

        result[parentFolderName][assetName] = assetPath;
      }
    });

    callback(null);
  });
};

// Hàm callback để thông báo trạng thái thực hiện
readAssets(baseFolderPath, "", (err) => {
  if (err) {
    console.error("Lỗi khi đọc thư mục assets:", err);
    return;
  }

  const jsonFilePath = path.join(__dirname, "output.json");
  fs.writeFile(jsonFilePath, JSON.stringify(result), (err) => {
    if (err) {
      console.error("Lỗi khi lưu file JSON:", err);
      return;
    }

    console.log("Danh sách tệp tin đã được lưu thành công trong file JSON:", jsonFilePath);
  });
});
