const addUploadCapabilities = dataProvider => ({
    ...dataProvider,
    specimenBulkCreate: (resource, params) => {
        const image1 = params.image1;
        if (!(image1 == null)) {
            if (!image1.rawFile instanceof File) {
                return Promise.reject('Error: Not a file...');
            };
            if (image1.rawFile instanceof File) {
                return Promise.resolve(convertFileToBase64(image1)
                    .then((picture64) => ({
                        src: picture64,
                        title: `${params.title}`,
                    }))
                )
                    .then(transformedNewPicture =>
                        dataProvider.specimenBulkCreate(resource, {
                            times: params.times,
                            custom_taxon_info: params.custom_taxon_info,
                            default_taxon_info: params.default_taxon_info,
                            collection_settings_info: params.collection_settings_info,
                            collect_point_info: params.collect_point_info,
                            tour: params.tour,
                            collection_code: params.collection_code,
                            date_identified: params.date_identified,
                            identified_by: params.identified_by,
                            year: params.year,
                            month: params.month,
                            day: params.day,
                            collecter: params.collecter,
                            sex: params.sex,
                            preparation_type: params.preparation_type,
                            disposition: params.disposition,
                            sampling_protocol: params.sampling_protocol,
                            sampling_effort: params.sampling_effort,
                            lifestage: params.lifestage,
                            establishment_means: params.establishment_means,
                            rights: params.rights,
                            note: params.note,
                            image1: transformedNewPicture['src']
                        })
                    );
            };
        }
        return dataProvider.specimenBulkCreate(resource, {
            times: params.times,
            custom_taxon_info: params.custom_taxon_info,
            default_taxon_info: params.default_taxon_info,
            collection_settings_info: params.collection_settings_info,
            collect_point_info: params.collect_point_info,
            tour: params.tour,
            collection_code: params.collection_code,
            date_identified: params.date_identified,
            identified_by: params.identified_by,
            year: params.year,
            month: params.month,
            day: params.day,
            collecter: params.collecter,
            sex: params.sex,
            preparation_type: params.preparation_type,
            disposition: params.disposition,
            sampling_protocol: params.sampling_protocol,
            sampling_effort: params.sampling_effort,
            lifestage: params.lifestage,
            establishment_means: params.establishment_means,
            rights: params.rights,
            note: params.note,
        })
    },

    create: (resource, params) => {
        if (resource == 'user-profiles/own-user-profiles' || resource == 'label-maker/own-labels'
            || resource == 'collection-settings/own-collection-settings') {
            return dataProvider.create(resource, params);
        }

        if (resource == 'specimens/own-specimens') {
            const image1 = params.data.image1;
            if (!(image1 == null)) {
                if (!image1.rawFile instanceof File) {
                    return Promise.reject('Error: Not a file...');
                };
                if (image1.rawFile instanceof File) {
                    return Promise.resolve(convertFileToBase64(image1)
                        .then((picture64) => ({
                            src: picture64,
                            title: `${params.data.title}`,
                        }))
                    )
                        .then(transformedNewPicture =>
                            dataProvider.specimenBulkCreate(resource, {
                                ...params,
                                data: {
                                    custom_taxon_info: params.data.custom_taxon_info,
                                    default_taxon_info: params.data.default_taxon_info,
                                    collection_settings_info: params.data.collection_settings_info,
                                    collect_point_info: params.data.collect_point_info,
                                    tour: params.data.tour,
                                    collection_code: params.data.collection_code,
                                    date_identified: params.data.date_identified,
                                    identified_by: params.data.identified_by,
                                    year: params.data.year,
                                    month: params.data.month,
                                    day: params.data.day,
                                    collecter: params.data.collecter,
                                    sex: params.data.sex,
                                    preparation_type: params.data.preparation_type,
                                    disposition: params.data.disposition,
                                    sampling_protocol: params.data.sampling_protocol,
                                    sampling_effort: params.data.sampling_effort,
                                    lifestage: params.data.lifestage,
                                    establishment_means: params.data.establishment_means,
                                    rights: params.data.rights,
                                    note: params.data.note,
                                    image1: transformedNewPicture['src']
                                },
                            })
                        );
                };
            }
            return dataProvider.specimenBulkCreate(resource, {
                ...params,
                data: {
                    custom_taxon_info: params.data.custom_taxon_info,
                    default_taxon_info: params.data.default_taxon_info,
                    collection_settings_info: params.data.collection_settings_info,
                    collect_point_info: params.data.collect_point_info,
                    tour: params.data.tour,
                    collection_code: params.data.collection_code,
                    date_identified: params.data.date_identified,
                    identified_by: params.data.identified_by,
                    year: params.data.year,
                    month: params.data.month,
                    day: params.data.day,
                    collecter: params.data.collecter,
                    sex: params.data.sex,
                    preparation_type: params.data.preparation_type,
                    disposition: params.data.disposition,
                    sampling_protocol: params.data.sampling_protocol,
                    sampling_effort: params.data.sampling_effort,
                    lifestage: params.data.lifestage,
                    establishment_means: params.data.establishment_means,
                    rights: params.data.rights,
                    note: params.data.note,
                }
            })
        };

        if (resource == 'taxa/shared-taxa') {
            const image1 = params.data.image1;
            const newData = params.data;
            delete newData.image1;
            delete newData.image2;
            delete newData.image3;
            delete newData.image4;
            delete newData.image5;
            if (!(image1 == null)) {
                if (!image1.rawFile instanceof File) {
                    return Promise.reject('Error: Not a file...');
                };
                if (image1.rawFile instanceof File) {
                    return Promise.resolve(convertFileToBase64(image1)
                        .then((picture64) => ({
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
                }
            })
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
                if (!image1.rawFile instanceof File) {
                    return Promise.reject('Error: Not a file...');
                };
                if (image1.rawFile instanceof File) {
                    return Promise.resolve(convertFileToBase64(image1)
                        .then((picture64) => ({
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
                }
            })
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
                if (!image1.rawFile instanceof File) {
                    return Promise.reject('Error: Not a file...');
                };
                if (image1.rawFile instanceof File) {
                    return Promise.resolve(convertFileToBase64(image1)
                        .then((picture64) => ({
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
                }
            })
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
                if (!image1.rawFile instanceof File) {
                    return Promise.reject('Error: Not a file...');
                };
                if (image1.rawFile instanceof File) {
                    return Promise.resolve(convertFileToBase64(image1)
                        .then((picture64) => ({
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
                    ...newData,
                }
            })
        };
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
                if (!image1.rawFile instanceof File) {
                    return Promise.reject('Error: Not a file...');
                };
                if (image1.rawFile instanceof File) {
                    return Promise.resolve(convertFileToBase64(image1)
                        .then((picture64) => ({
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
                }
            })
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
                if (!image1.rawFile instanceof File) {
                    return Promise.reject('Error: Not a file...');
                };
                if (image1.rawFile instanceof File) {
                    return Promise.resolve(convertFileToBase64(image1)
                        .then((picture64) => ({
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
                }
            })
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
                if (!image1.rawFile instanceof File) {
                    return Promise.reject('Error: Not a file...');
                };
                if (image1.rawFile instanceof File) {
                    return Promise.resolve(convertFileToBase64(image1)
                        .then((picture64) => ({
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
                }
            })
        };

        if (resource == 'specimens/own-specimens') {
            const image1 = params.data.image1;
            if (!(image1 == null)) {
                if (!image1.rawFile instanceof File) {
                    return Promise.reject('Error: Not a file...');
                };
                if (image1.rawFile instanceof File) {
                    return Promise.resolve(convertFileToBase64(image1)
                        .then((picture64) => ({
                            src: picture64,
                            title: `${params.data.title}`,
                        }))
                    )
                        .then(transformedNewPicture =>
                            dataProvider.update(resource, {
                                ...params,
                                data: {
                                    custom_taxon_info: params.data.custom_taxon_info,
                                    default_taxon_info: params.data.default_taxon_info,
                                    collection_settings_info: params.data.collection_settings_info,
                                    collect_point_info: params.data.collect_point_info,
                                    tour: params.data.tour,
                                    collection_code: params.data.collection_code,
                                    date_identified: params.data.date_identified,
                                    identified_by: params.data.identified_by,
                                    year: params.data.year,
                                    month: params.data.month,
                                    day: params.data.day,
                                    collecter: params.data.collecter,
                                    sex: params.data.sex,
                                    preparation_type: params.data.preparation_type,
                                    disposition: params.data.disposition,
                                    sampling_protocol: params.data.sampling_protocol,
                                    sampling_effort: params.data.sampling_effort,
                                    lifestage: params.data.lifestage,
                                    establishment_means: params.data.establishment_means,
                                    rights: params.data.rights,
                                    note: params.data.note,
                                    image1: transformedNewPicture['src']
                                },
                            })
                        );
                };
            }
            return dataProvider.update(resource, {
                ...params,
                data: {
                    custom_taxon_info: params.data.custom_taxon_info,
                    default_taxon_info: params.data.default_taxon_info,
                    collection_settings_info: params.data.collection_settings_info,
                    collect_point_info: params.data.collect_point_info,
                    tour: params.data.tour,
                    collection_code: params.data.collection_code,
                    date_identified: params.data.date_identified,
                    identified_by: params.data.identified_by,
                    year: params.data.year,
                    month: params.data.month,
                    day: params.data.day,
                    collecter: params.data.collecter,
                    sex: params.data.sex,
                    preparation_type: params.data.preparation_type,
                    disposition: params.data.disposition,
                    sampling_protocol: params.data.sampling_protocol,
                    sampling_effort: params.data.sampling_effort,
                    lifestage: params.data.lifestage,
                    establishment_means: params.data.establishment_means,
                    rights: params.data.rights,
                    note: params.data.note,
                }
            })
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