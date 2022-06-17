USE OrphanChildrenSupport
GO

CREATE PROCEDURE [dbo].[ChildrenProfileSuportCategories_Delete]  
	-- Add the parameters for the stored procedure here
	@ChildrenProfileId bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE [OrphanChildrenSupport].[dbo].[ChildrenProfileSupportCategory] SET IsDeleted = 1 WHERE ChildrenProfileId = @ChildrenProfileId
END
GO
USE [master]
GO
ALTER DATABASE [OrphanChildrenSupport] SET READ_WRITE 
GO

----------------------------------------------------------------------------------------------------------------------------------------------------

CREATE PROCEDURE [dbo].[ReportDetails_Delete]  
	-- Add the parameters for the stored procedure here
	@ReportId bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE [OrphanChildrenSupport].[dbo].ReportDetail SET IsDeleted = 1 WHERE ReportId = @ReportId
END
GO
USE [master]
GO
ALTER DATABASE [OrphanChildrenSupport] SET READ_WRITE 
GO

----------------------------------------------------------------------------------------------------------------------------------------------------

CREATE PROCEDURE [dbo].[DeleteDonationDetails_Delete]  
	-- Add the parameters for the stored procedure here
	@DonationId bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE [OrphanChildrenSupport].[dbo].[DonationDetail] SET IsDeleted = 1 WHERE DonationId = @DonationId
END
GO
USE [master]
GO
ALTER DATABASE [OrphanChildrenSupport] SET READ_WRITE 
GO

----------------------------------------------------------------------------------------------------------------------------------------------------

CREATE PROCEDURE [dbo].[Favorites_Delete]  
	-- Add the parameters for the stored procedure here
	@AccountId bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE [OrphanChildrenSupport].[dbo].Favorite SET IsDeleted = 1 WHERE AccountId = @AccountId
END
GO
USE [master]
GO
ALTER DATABASE [OrphanChildrenSupport] SET READ_WRITE 
GO