const GlobalFunctions = {}
    GlobalFunctions.getBase64 = (file)=> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve({
                base64:reader.result,
                name: file.name
            });
            reader.onerror = error => reject(error);
        });
    }

export default GlobalFunctions
