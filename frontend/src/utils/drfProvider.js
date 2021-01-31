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
      ).then(responses => ({ data: responses})),
  };
};