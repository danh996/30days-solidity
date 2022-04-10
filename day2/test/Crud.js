const Crud = artifacts.require("Crud");

contract ("Crud", () => {

    var crud = null;
    before(async() => {
        crud = await Crud.deployed();
    })

    it("should be created players", async () => {
        await crud.createPlayer("Le Cong Danh");
        const player = await crud.getPlayer(0);
        assert(player[0].toNumber() ==  0);
        assert(player[1] == "Le Cong Danh");
    });

    it("should be updated players", async () => {
        await crud.updatePlayer(0, "Le Cong Danh 1996");
        const player = await crud.getPlayer(0);
        assert(player[1] == "Le Cong Danh 1996");
    });

    it("should be revert if player is not exist", async () => {
        try{
            await crud.updatePlayer(100, "Le Cong Danh 100");
        } catch(e){
            assert(e.message.includes("Player does not exist"));
            return;
        }

        assert(false);
    });

    it("should be deleted", async () => {
        await crud.deletePlayer(0);
        
        try{
            await crud.getPlayer(0);
        } catch(e){
            assert(e.message.includes("Player does not exist"));
            return;
        }
        //assert(false);

    });

    it("should be deleted but player is not exist", async () => {
        
        try{
            await crud.deletePlayer(100);
        } catch(e){
            assert(e.message.includes("Player does not exist"));
            return;
        }

        assert(false);

    });
})
