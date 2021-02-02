const addUploadCapabilities = dataProvider => ({
    ...dataProvider,
    create: (resource, params) => {
        if (resource == 'user-profiles/own-user-profiles' || resource == 'label-maker/own-labels'
            || resource == 'collection-settings/own-collection-settings') {
            return dataProvider.create(resource, params);
        }

        if (resource == 'taxa/shared-taxa') {
            const image1 = params.data.image1;
            const newData = params.data;
            delete newData.image1;
            delete newData.image2;
            delete newData.image3;
            delete newData.image4;
            delete newData.image5;
            if (!(image1 == null)) {
                if (!image1.rawFile instanceof File){
                    return Promise.reject('Error: Not a file...');
                };
                if (image1.rawFile instanceof File){
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
                                ...newData,
                                image1: transformedNewPicture['src']
                            },
                        })
                    );
                };
            }
            return dataProvider.create(resource, {
                ...params,
                data: {
                    ...newData
                }})
        };

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

    update: (resource, params) => {
        if (resource == 'user-profiles/own-user-profiles' || resource == 'label-maker/own-labels'
            || resource == 'collection-settings/own-collection-settings') {
            return dataProvider.update(resource, params);
        };

        if (resource == 'taxa/own-taxa') {
            const image1 = params.data.image1;
            const newData = params.data;
            delete newData.id;
            delete newData.created_at;
            delete newData.is_private;
            delete newData.image1;
            delete newData.image2;
            delete newData.image3;
            delete newData.image4;
            delete newData.image5;
            if (!(image1 == null)) {
                if (!image1.rawFile instanceof File){
                    return Promise.reject('Error: Not a file...');
                };
                if (image1.rawFile instanceof File){
                    return Promise.resolve(convertFileToBase64(image1)
                    .then( (picture64) => ({
                            src: picture64,
                            title: `${params.data.title}`,
                        }))
                    )
                    .then(transformedNewPicture =>
                        dataProvider.update(resource, {
                            ...params,
                            data: {
                                ...newData,
                                image1: transformedNewPicture['src']
                            },
                        })
                    );
                };
            }
            return dataProvider.update(resource, {
                ...params,
                data: {
                    ...newData
                }})
        };

        if (resource == 'tours/own-tours') {
            const image1 = params.data.image1;
            const newData = params.data;
            delete newData.id;
            delete newData.created_at;
            delete newData.track;
            delete newData.image1;
            delete newData.image2;
            delete newData.image3;
            delete newData.image4;
            delete newData.image5;
            if (!(image1 == null)) {
                if (!image1.rawFile instanceof File){
                    return Promise.reject('Error: Not a file...');
                };
                if (image1.rawFile instanceof File){
                    return Promise.resolve(convertFileToBase64(image1)
                    .then( (picture64) => ({
                            src: picture64,
                            title: `${params.data.title}`,
                        }))
                    )
                    .then(transformedNewPicture =>
                        dataProvider.update(resource, {
                            ...params,
                            data: {
                                ...newData,
                                image1: transformedNewPicture['src']
                            },
                        })
                    );
                };
            }
            return dataProvider.update(resource, {
                ...params,
                data: {
                    ...newData
                }})
        };

        if (resource == 'collect-points/own-collect-points') {
            const image1 = params.data.image1;
            const newData = params.data;
            delete newData.id;
            delete newData.created_at;
            delete newData.longitude;
            delete newData.latitude;
            delete newData.image1;
            delete newData.image2;
            delete newData.image3;
            delete newData.image4;
            delete newData.image5;
            if (!(image1 == null)) {
                if (!image1.rawFile instanceof File){
                    return Promise.reject('Error: Not a file...');
                };
                if (image1.rawFile instanceof File){
                    return Promise.resolve(convertFileToBase64(image1)
                    .then( (picture64) => ({
                            src: picture64,
                            title: `${params.data.title}`,
                        }))
                    )
                    .then(transformedNewPicture =>
                        dataProvider.update(resource, {
                            ...params,
                            data: {
                                ...newData,
                                image1: transformedNewPicture['src']
                            },
                        })
                    );
                };
            }
            return dataProvider.update(resource, {
                ...params,
                data: {
                    ...newData,
                }})
        };
    },
});


const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.rawFile);

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

const convertFileToBase64Simple = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);
    return reader.result;
};
    
export default addUploadCapabilities;