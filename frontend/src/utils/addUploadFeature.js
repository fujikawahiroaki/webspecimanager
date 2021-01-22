/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadCapabilities = dataProvider => ({
    ...dataProvider,
    create: (resource, params) => {
        if (resource == 'user-profiles/own-user-profiles' || resource == 'label-maker/own-labels') {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
        }
        // The posts edition form uses a file upload widget for the pictures field.
        // Freshly dropped pictures are File objects
        // and must be converted to base64 strings
        if (!params.data.image1) {
            return dataProvider.create(resource, params);
        }
        const image1 = params.data.image1;
        if (!image1.rawFile instanceof File){
            return Promise.reject('Error: Not a file...');
        }

        return Promise.resolve(convertFileToBase64(image1)
            .then( (picture64) => ({
                    src: picture64,
                    title: `${params.data.title}`,
                }))
            )
            .then(transformedNewPicture =>
                dataProvider.create(resource, {
                    ...params,
                    data: {
                        ...params.data,
                        image1: transformedNewPicture['src']
                    },
                })
            );
    },
});

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.rawFile);

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

export default addUploadCapabilities;