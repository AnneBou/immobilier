module.exports = class UploadImageProduct {
    moveFile(file, id_product) {
        return new Promise((resolve, reject) => {
            const regex = /[^a-z0-9_\.]/i;
            let baseName = file.name.replace(regex,'_').replace('__','_').replace('..','_');
            let uploadPath = process.env.DIR_IMG_PRODUCT+id_product+'/'+baseName;
            file.mv(uploadPath, (err) => resolve(true));
        });
    }
    getPictures(id_product) {
        // boucle dans le répertoire et retourne la liste de toutes les images
        if(fs.direxistsSync) {
            const filenames = fs.readdirSync(process.env.DIR_IMG_PRODUCT+id_product);
        }
        return filenames;
    }
}
