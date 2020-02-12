import { IEntity } from "./types";
 
interface IProps {
	storageName: string,
	getFromJSON: () => IEntity[],
}

export class StorageService {

	storageName: string;
	entitiesALL: IEntity[];
	_namesALL: string[];
	isWebStorageSupported: boolean;
	
	constructor(storageName: string,	getFromJSON: () => IEntity[]) {
		this.storageName = storageName
		this.isWebStorageSupported = 'localStorage' in window 

		const s = localStorage.getItem(storageName);
		this.entitiesALL = s !== null ? JSON.parse(s) : getFromJSON();
		this._namesALL = this.entitiesALL.map(entity => entity.name)
	}
	
	get namesALL(): string[] { return this._namesALL }

	async getPageEntites(query: string, pageSize: number, page: number): Promise<any> {
		const entities = query.trim().length === 0 ? 
			this.entitiesALL : 
			this.entitiesALL.filter(entity => entity.name.includes(query))
		const offset = page * pageSize
		const pageEntities = entities.slice(offset, offset + pageSize);
		const pageCount =  Math.ceil(entities.length / pageSize)
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
					  'results': this.entitiesALL.find(e => e.id === id)
					}
				 })
			  }, 200)
		})
	}
	
	async removeEntity(id: number): Promise<any> {
		this.entitiesALL = this.entitiesALL.filter(e => e.id !== id);
		localStorage.setItem(this.storageName, JSON.stringify(this.entitiesALL));
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
			entity.id = this.entitiesALL.length === 0 ? 1 : Math.max(...this.entitiesALL.map(e => e.id)) + 1
			this.entitiesALL = [...this.entitiesALL, { ...entity }]
		}
		else {
			this.entitiesALL = this.entitiesALL.map(ent => ent.id === entity.id ? { ...entity } : ent)
		}
		localStorage.setItem(this.storageName, JSON.stringify(this.entitiesALL));
		this._namesALL = this.entitiesALL.map(entity => entity.name)
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




