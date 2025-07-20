import { Injectable } from "@nestjs/common";



@Injectable()
export class AdminService {
  getAdmin(): string {
    return 'Admin service is running successfully.';
  }
  
  getAdminById(id: string): string {
    return 'Get admin by id: ' + id;
  }
  
  createAdmin(): string {
    return 'Create admin';
  }
}