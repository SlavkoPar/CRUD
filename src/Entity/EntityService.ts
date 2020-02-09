import { IEntity } from "./types";
 
interface IProps {
	storageName: string,
	getFromJSON: () => IEntity[],
}

export class StorageService {

	storageName: string;
	entitiesAll: IEntity[];
	isWebStorageSupported: boolean;
	
	constructor(storageName: string,	getFromJSON: () => IEntity[]) {
		this.storageName = storageName
		this.isWebStorageSupported = 'localStorage' in window 

		const s = localStorage.getItem(storageName);
		this.entitiesAll = s !== null ? JSON.parse(s) : getFromJSON();
	}
	
	async getPageEntites(query: string, pageSize: number, page: number): Promise<any> {
		const offset = page * pageSize
		const pageEntities = this.entitiesAll.slice(offset, offset + pageSize);
		const pageCount =  Math.ceil(this.entitiesAll.length / pageSize)
		return new Promise((resolve, reject) => {
			setTimeout(() => {
					resolve({
					'status': 200,
					'content-type': 'application/json',
					'data' : {
						'results': { pageEntities, pageCount }
					}
					})
				}, 200)
		})
	}

	async getEntity(id: number): Promise<any> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				 resolve({
					'status': 200,
					'content-type': 'application/json',
					'data' : {
					  'results': this.entitiesAll.find(e => e.id === id)
					}
				 })
			  }, 200)
		})
	}
	
	async removeEntity(id: number): Promise<any> {
		this.entitiesAll = this.entitiesAll.filter(e => e.id !== id);
		localStorage.setItem(this.storageName, JSON.stringify(this.entitiesAll));
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				 resolve({
					'status': 200,
					'content-type': 'application/json',
					'data' : {
					  'results': true
					}
				 })
			  }, 200)
		})
	}
	
	
	async storeEntity(formMode: string, entity: IEntity): Promise<any> {
	
		if (formMode === 'add') {
			entity.id = this.entitiesAll.length === 0 ? 1 : Math.max(...this.entitiesAll.map(e => e.id)) + 1
			this.entitiesAll = [...this.entitiesAll, { ...entity }]
		}
		else {
			this.entitiesAll = this.entitiesAll.map(ent => ent.id === entity.id ? { ...entity } : ent)
		}
		localStorage.setItem(this.storageName, JSON.stringify(this.entitiesAll));
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				 resolve({
					'status': 200,
					'content-type': 'application/json',
					'data' : {
					  'results': entity
					}
				 })
			  }, 200)
		})
	}

}




