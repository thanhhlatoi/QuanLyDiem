import { defineStore } from 'pinia'

export const useMenu = defineStore('menuId', {

  state: () => ({
    selectedKeys: [],
    openKeys: []
  }),

  actions: {
    onselectedKeys(data){
        this.selectedKeys = data;
    },
    onOpenKeys(data){
        this.openKeys = data;
    }
  }
})