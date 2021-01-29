const addUploadCapabilities = dataProvider => ({
    ...dataProvider,
    create: (resource, params) => {
        if (resource == 'user-profiles/own-user-profiles' || resource == 'label-maker/own-labels') {
            return dataProvider.create(resource, params);
        }
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
        if (resource == 'user-profiles/own-user-profiles' || resource == 'label-maker/own-labels') {
            return dataProvider.update(resource, params);
        };
        if (resource == 'taxa/own-taxa') {
            const image1 = params.data.image1;
            if (!image1.rawFile instanceof File){
                return Promise.reject('Error: Not a file...');
            };

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
                            kingdom: params.data.kingdom,
                            phylum: params.data.phylum,
                            class_name: params.data.class_name,
                            order: params.data.order,
                            suborder: params.data.suborder,
                            family: params.data.family,
                            subfamily: params.data.subfamily,
                            tribe: params.data.tribe,
                            subtribe: params.data.subtribe,
                            genus: params.data.genus,
                            subgenus: params.data.subgenus,
                            species: params.data.species,
                            subspecies: params.data.subspecies,
                            scientific_name_author: params.data.scientific_name_author,
                            name_publishedin_year: params.data.name_publishedin_year,
                            japanese_name: params.data.japanese_name,
                            distribution: params.data.distribution,
                            note: params.data.note,
                            image1: transformedNewPicture['src']
                        },
                    })
                );
        };
        if (resource == 'tours/own-tours') {
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
                    dataProvider.update(resource, {
                        ...params,
                        data: {
                            title: params.data.title,
                            start_date: params.data.start_date,
                            end_date: params.data.end_date,
                            note: params.data.note,
                            image1: transformedNewPicture['src']
                        },
                    })
                );
        };
        if (resource == 'collect-points/own-collect-points') {
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
                    dataProvider.update(resource, {
                        ...params,
                        data: {
                            country: params.data.country,
                            contient: params.data.contient,
                            island_group: params.data.island_group,
                            island: params.data.island,
                            state_provice: params.data.state_provice,
                            county: params.data.county,
                            municipality: params.data.municipality,
                            verbatim_locality: params.data.verbatim_locality,
                            japanese_place_name: params.data.japanese_place_name,
                            japanese_place_name_detail: params.data.japanese_place_name_detail,
                            location:  {longitude: params.data.location.longitude, latitude: params.data.latitude},
                            coordinate_precision: params.data.coordinate_precision,
                            minimum_elevation: params.data.minimum_elevation,
                            maximum_elevation: params.data.maximum_elevation,
                            minimum_depth: params.data.minimum_depth,
                            maximum_depth: params.data.maximum_depth,
                            tour: params.data.tour,
                            image1: transformedNewPicture['src']
                        },
                    })
                );
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

export default addUploadCapabilities;