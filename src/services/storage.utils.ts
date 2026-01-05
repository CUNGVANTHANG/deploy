
export class StorageService<T extends { id: string }> {
    private key: string;

    constructor(key: string, defaultData: T[] = []) {
        this.key = key;
        this.initialize(defaultData);
    }

    private initialize(defaultData: T[]) {
        const stored = localStorage.getItem(this.key);
        if (!stored) {
            localStorage.setItem(this.key, JSON.stringify(defaultData));
        }
    }

    async getAll(): Promise<T[]> {
        await new Promise(resolve => setTimeout(resolve, 400)); // Simulate network delay
        const stored = localStorage.getItem(this.key);
        return stored ? JSON.parse(stored) : [];
    }

    async getById(id: string): Promise<T | undefined> {
        await new Promise(resolve => setTimeout(resolve, 200));
        const items = await this.getAll();
        return items.find(item => item.id === id);
    }

    async create(item: T): Promise<T> {
        await new Promise(resolve => setTimeout(resolve, 600));
        const items = await this.getAll();
        if (items.find(i => i.id === item.id)) {
            throw new Error(`Item with ID ${item.id} already exists`);
        }
        const newItems = [...items, item];
        localStorage.setItem(this.key, JSON.stringify(newItems));
        return item;
    }

    async update(id: string, updates: Partial<T>): Promise<T> {
        await new Promise(resolve => setTimeout(resolve, 400));
        const items = await this.getAll();
        const index = items.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error(`Item with ID ${id} not found`);
        }

        const updatedItem = { ...items[index], ...updates };
        items[index] = updatedItem;
        localStorage.setItem(this.key, JSON.stringify(items));
        return updatedItem;
    }

    async delete(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 400));
        const items = await this.getAll();
        const newItems = items.filter(item => item.id !== id);
        localStorage.setItem(this.key, JSON.stringify(newItems));
    }
}
