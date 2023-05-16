import { RoleModel } from '../models/models.js';
class RoleController {
    async getRoleById(req, res, next) {
        try {
            const roleId = Number(req.params.roleId);
            const role = await RoleModel.findOne({ where: { id: roleId } });
            return res.status(200).json(role);
        }
        catch (e) {
            console.log(e);
            next(e);
        }
    }
}
export default new RoleController();
//# sourceMappingURL=RoleController.js.map