import { stringify } from 'query-string';
import {
  Identifier,
  Pagination,
  Sort,
  Filter,
  fetchUtils,
  DataProvider,
} from 'ra-core';

const getPaginationQuery = (pagination) => {
  return {
    page: pagination.page,
    page_size: pagination.perPage,
  };
};

const getFilterQuery = (filter) => {
  const { q: search, ...otherSearchParams } = filter;
  return {
    ...otherSearchParams,
    search,
  };
};

export const getOrderingQuery = (sort) => {
  const { field, order } = sort;
  return {
    ordering: `${order === 'ASC' ? '' : '-'}${field}`,
  };
};

export default (
  apiUrl,
  httpClient = fetchUtils.fetchJson
) => {
  const getOneJson = (resource, id) =>
    httpClient(`${apiUrl}/${resource}/${id}/`).then(
      (response) => response.json
    );

  return {
    getList: async (resource, params) => {
      const query = {
        ...getFilterQuery(params.filter),
        ...getPaginationQuery(params.pagination),
        ...getOrderingQuery(params.sort),
      };
      const url = `${apiUrl}/${resource}/?${stringify(query)}`;

      const { json } = await httpClient(url);

      return {
        data: json.results,
        total: json.count,
      };
    },

    getOne: async (resource, params) => {
      const data = await getOneJson(resource, params.id);
      return {
        data,
      };
    },

    getLabelPdf: async (resource, params) => {
      const data = await httpClient(`${apiUrl}/${resource}/${params.id}/make_pdf`).then(
        (response) => response.json['pdf']
      );
      const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
      const bin = atob(data.replace(/^.*,/, ''));
      const buffer = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
      }
      const blob = new Blob([bom, buffer.buffer], {
        type: "application/pdf",
      });
      const pdfUrl = window.URL.createObjectURL(blob)
      if (window.open(pdfUrl, "_blank")) {

      } else {
        window.location.href = pdfUrl;
      }
      return { data };
    },

    getSpecimenCounter: async (resource, params) => {
      const query = {
        ...getFilterQuery(params.filter),
      };
      const data = await httpClient(`${apiUrl}/specimens/own-specimens/counter/?target_taxon=${params.target_taxon}&${stringify(query)}`).then(
        (response) => response.json
      );
      return { data };
    },

    getSpecimenPercentage: async (resource, params) => {
      const data = await httpClient(`${apiUrl}/specimens/own-specimens/percentage_taxon/?target_taxon=${params.target_taxon}&target_collection=${params.target_collection}&is_all=${params.is_all}`).then(
        (response) => response.json
      );
      return {data};
    },

    getMany: (resource, params) => {
      return Promise.all(
        params.ids.map(id => getOneJson(resource, id))
      ).then(data => ({ data }));
    },

    getManyReference: async (resource, params) => {
      const query = {
        ...getFilterQuery(params.filter),
        ...getPaginationQuery(params.pagination),
        ...getOrderingQuery(params.sort),
        [params.target]: params.id,
      };
      const url = `${apiUrl}/${resource}/?${stringify(query)}`;

      const { json } = await httpClient(url);
      return {
        data: json.results,
        total: json.count,
      };
    },

    update: async (resource, params) => {
      const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}/`, {
        method: 'PATCH',
        body: JSON.stringify(params.data),
      });
      return { data: json };
    },

    updateMany: (resource, params) =>
      Promise.all(
        params.ids.map(id =>
          httpClient(`${apiUrl}/${resource}/${id}/`, {
            method: 'PATCH',
            body: JSON.stringify(params.data),
          })
        )
      ).then(responses => ({ data: responses.map(({ json }) => json.id) })),

    specimenBulkCreate: async (resource, params) => {
      if (params.times == null) {
        params.times = 1;
      };
      if (params.times > 100) {
        return;
      };
      for (let i = 1; i <= params.times; i++) {
        if (!(params.collection_settings_info == null)) {
          if (params.collection_code == null || params.collection_code == '') {
            const collection_settings = await getOneJson('collection-settings/own-collection-settings', params.collection_settings_info);
            const new_collection_code = collection_settings['latest_collection_code'] + 1
            const { new_latest_collection_code } = await httpClient(`${apiUrl}/collection-settings/own-collection-settings/${params.collection_settings_info}/`, {
              method: 'PATCH',
              body: `{"latest_collection_code": ${new_collection_code}}`,
            });
            const { json } = await httpClient(`${apiUrl}/${resource}/`, {
              method: 'POST',
              body: JSON.stringify({ ...params, collection_code: new_collection_code }),
            });
            if (i == params.times) {
              return {
                data: { ...json },
              };
            };
          } else {
            const { json } = await httpClient(`${apiUrl}/${resource}/`, {
              method: 'POST',
              body: JSON.stringify(params),
            });
            if (i == params.times) {
              return {
                data: { ...json },
              };
            };
          };
        } else {
            const { json } = await httpClient(`${apiUrl}/${resource}/`, {
            method: 'POST',
            body: JSON.stringify(params),
            });
            if (i == params.times) {
              return {
                data: { ...json },
              };
            };
        };
      };
    },

    create: async (resource, params) => {
      if (resource == 'taxa/shared-taxa') {
        delete params.data.is_private
        const { json } = await httpClient(`${apiUrl}/taxa/own-taxa/`, {
          method: 'POST',
          body: JSON.stringify(params.data),
        });
        return {
          data: { ...json },
        };
      };

      if (resource == 'specimens/own-specimens') {
        if (!(params.data.collection_settings_info == null)) {
          if (params.data.collection_code == null || params.data.collection_code == '') {
            const collection_settings = await getOneJson('collection-settings/own-collection-settings', params.data.collection_settings_info);
            params.data.collection_code = collection_settings['latest_collection_code'] + 1
            const { new_latest_collection_code } = await httpClient(`${apiUrl}/collection-settings/own-collection-settings/${params.data.collection_settings_info}/`, {
              method: 'PATCH',
              body: `{"latest_collection_code": ${params.data.collection_code}}`,
            });
            const { json } = await httpClient(`${apiUrl}/${resource}/`, {
              method: 'POST',
              body: JSON.stringify(params.data),
            });
            return {
              data: { ...json },
            };
          };
        };
      };

      const { json } = await httpClient(`${apiUrl}/${resource}/`, {
        method: 'POST',
        body: JSON.stringify(params.data),
      });
      return {
        data: { ...json },
      };
    },

    delete: (resource, params) =>
      httpClient(`${apiUrl}/${resource}/${params.id}/`, {
        method: 'DELETE',
      }).then(() => ({ data: params.previousData })),

    deleteMany: (resource, params) =>
      Promise.all(
        params.ids.map(id =>
          httpClient(`${apiUrl}/${resource}/${id}/`, {
            method: 'DELETE',
          })
        )
      ).then(responses => ({ data: responses })),
  };
};