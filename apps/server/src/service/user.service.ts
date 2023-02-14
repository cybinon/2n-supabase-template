import { InjectDataSource } from "@nestjs/typeorm";
import { createClient, GoTrueAdminApi } from "@supabase/supabase-js";
import { DataSource } from "typeorm";

export class UserService {
  supaAdmin: GoTrueAdminApi;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) { 
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
    this.supaAdmin = supabase.auth.admin;
  }

  async initUser(id: string) {
    const connection = this.dataSource.createQueryRunner();
    await connection.connect();

    let user:any = await connection.manager.findOne('user', { where: { id } });
    if (!user) user = await this.createUser({ id, full_name: "", email: "" });
    return user;
  }

  async createUser({ id, full_name, email }) {
    const connection = this.dataSource.createQueryRunner();
    await connection.connect();
    let wallet:any = await connection.manager.findOne('wallet', {
      where: { userId: id, }
    });
    if (!wallet) wallet = await connection.manager.insert('wallet', {
      address: Date.now().toString(36).slice(-8),
      balance: 0,
      userId: id
    });
    await connection.manager.insert('user', {
      id,
      full_name,
      email,
      wallet
    });
    
    return await connection.manager.findOne('user', { where: { id } });
  }


  async updateUser(id: string, { city, district, address, phone }:any) {
    const connection = this.dataSource.createQueryRunner();
    await connection.connect();
    const user:any = await connection.manager.findOneBy('user', { id });
    if (!user) throw new Error("User not found");
    user.city = city;
    user.district = district;
    user.address = address;
    user.phone = phone;
    const supaUser = await this.supaAdmin.updateUserById(user.id, {
      phone: user.phone,
    });
    if (!supaUser) throw new Error("User not found");
    user.email = supaUser.data.user.email;
    user.full_name = supaUser.data.user.user_metadata.full_name;

    await connection.manager.save('user', user);
    return user;
  }

}
