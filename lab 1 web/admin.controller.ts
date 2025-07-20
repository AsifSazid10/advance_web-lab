import { Controller, Get, Param } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

@Get()
    getAdmin(): string {
    return this.adminService.getAdmin();
}
@Get('/:id')
    getAdminById(@Param('id') id: string): string {
        return this.adminService.getAdminById(id);
    }

}


