USE [OrphanChildrenSupport]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](max) NULL,
	[Gender] [bit] NOT NULL,
	[DOB] [datetime2](7) NOT NULL,
	[Email] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[Address] [nvarchar](max) NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[Role] [int] NOT NULL,
	[VerificationToken] [nvarchar](max) NULL,
	[VerifiedTime] [datetime2](7) NULL,
	[ResetToken] [nvarchar](max) NULL,
	[ResetTokenExpireTime] [datetime2](7) NULL,
	[PasswordResetTime] [datetime2](7) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedTime] [datetime2](7) NULL,
	[LastModified] [datetime2](7) NULL,
	[ModifiedBy] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Changelog]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Changelog](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[API] [nvarchar](max) NULL,
	[Service] [nvarchar](max) NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedTime] [datetime2](7) NULL,
	[LastModified] [datetime2](7) NULL,
	[ModifiedBy] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Changelog] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChildrenProfile]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChildrenProfile](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](max) NULL,
	[Gender] [bit] NOT NULL,
	[DOB] [datetime2](7) NOT NULL,
	[Age] [int] NOT NULL,
	[GuardianPhoneNumber] [nvarchar](max) NULL,
	[GuardianName] [nvarchar](max) NULL,
	[DetailAddress] [nvarchar](max) NULL,
	[PublicAddress] [nvarchar](max) NULL,
	[Circumstance] [nvarchar](max) NULL,
	[Status] [int] NOT NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedTime] [datetime2](7) NULL,
	[LastModified] [datetime2](7) NULL,
	[ModifiedBy] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_ChildrenProfile] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChildrenProfileImage]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChildrenProfileImage](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ChildrenProfileId] [bigint] NOT NULL,
	[ImagePath] [nvarchar](max) NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedTime] [datetime2](7) NULL,
	[LastModified] [datetime2](7) NULL,
	[ModifiedBy] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_ChildrenProfileImage] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChildrenProfileSupportCategory]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChildrenProfileSupportCategory](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ChildrenProfileId] [bigint] NOT NULL,
	[SupportCategoryId] [bigint] NOT NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedTime] [datetime2](7) NULL,
	[LastModified] [datetime2](7) NULL,
	[ModifiedBy] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_ChildrenProfileSupportCategory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Donation]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Donation](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[AccountId] [bigint] NOT NULL,
	[ChildrenProfileId] [bigint] NOT NULL,
	[Status] [int] NOT NULL,
	[Note] [nvarchar](max) NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedTime] [datetime2](7) NULL,
	[LastModified] [datetime2](7) NULL,
	[ModifiedBy] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Donation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DonationDetail]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DonationDetail](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[DonationId] [bigint] NOT NULL,
	[SupportCategoryId] [bigint] NOT NULL,
	[Status] [int] NOT NULL,
	[Note] [nvarchar](max) NULL,
	[ImagePath] [nvarchar](max) NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedTime] [datetime2](7) NULL,
	[LastModified] [datetime2](7) NULL,
	[ModifiedBy] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_DonationDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Favorite]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Favorite](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ChildrenProfileId] [bigint] NOT NULL,
	[AccountId] [bigint] NOT NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedTime] [datetime2](7) NULL,
	[LastModified] [datetime2](7) NULL,
	[ModifiedBy] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Favorite] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Notification]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notification](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[AccountId] [bigint] NOT NULL,
	[Content] [nvarchar](max) NULL,
	[IsSeen] [bit] NOT NULL,
	[SeenTime] [datetime2](7) NOT NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedTime] [datetime2](7) NULL,
	[LastModified] [datetime2](7) NULL,
	[ModifiedBy] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Notification] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RefreshToken]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RefreshToken](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[AccountId] [bigint] NOT NULL,
	[Token] [nvarchar](max) NULL,
	[Expires] [datetime2](7) NOT NULL,
	[Created] [datetime2](7) NOT NULL,
	[CreatedByIp] [nvarchar](max) NULL,
	[Revoked] [datetime2](7) NULL,
	[RevokedByIp] [nvarchar](max) NULL,
	[ReplacedByToken] [nvarchar](max) NULL,
 CONSTRAINT [PK_RefreshToken] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Report]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Report](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[AccountId] [bigint] NOT NULL,
	[ChildrenProfileId] [bigint] NOT NULL,
	[Status] [int] NOT NULL,
	[Note] [nvarchar](max) NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedTime] [datetime2](7) NULL,
	[LastModified] [datetime2](7) NULL,
	[ModifiedBy] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Report] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReportDetail]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReportDetail](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ReportId] [bigint] NOT NULL,
	[ReportFieldCategoryId] [bigint] NOT NULL,
	[ReportInformation] [nvarchar](max) NULL,
	[Status] [int] NOT NULL,
	[Note] [nvarchar](max) NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedTime] [datetime2](7) NULL,
	[LastModified] [datetime2](7) NULL,
	[ModifiedBy] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_ReportDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReportFieldCategory]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReportFieldCategory](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](max) NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedTime] [datetime2](7) NULL,
	[LastModified] [datetime2](7) NULL,
	[ModifiedBy] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_ReportFieldCategory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SupportCategory]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SupportCategory](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](max) NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedTime] [datetime2](7) NULL,
	[LastModified] [datetime2](7) NULL,
	[ModifiedBy] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_SupportCategory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Account] ON 

INSERT [dbo].[Account] ([Id], [FullName], [Gender], [DOB], [Email], [PhoneNumber], [Address], [PasswordHash], [Role], [VerificationToken], [VerifiedTime], [ResetToken], [ResetTokenExpireTime], [PasswordResetTime], [IsActive], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (1, N'Admin', 1, CAST(N'1999-10-03T22:10:36.0000000' AS DateTime2), N'admin@forthechildren.com', N'0123456789', N'Binh Duong-Thu Dau Mot-Nam Ky Khoi Nghia', N'$2a$11$Beiyi/xKSmwT.UdiaZbDTO7oN333p3P6YTCs1PQbr5DrHTFJ9gyG2', 0, NULL, CAST(N'2022-06-23T15:13:13.7041801' AS DateTime2), NULL, NULL, NULL, 1, NULL, CAST(N'2022-06-23T15:11:11.8027425' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Account] ([Id], [FullName], [Gender], [DOB], [Email], [PhoneNumber], [Address], [PasswordHash], [Role], [VerificationToken], [VerifiedTime], [ResetToken], [ResetTokenExpireTime], [PasswordResetTime], [IsActive], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (2, N'System User 1', 1, CAST(N'2000-01-01T00:00:00.0000000' AS DateTime2), N'systemuser1@forthechildren.com', N'0123456789', N'Binh Duong-Ben Cat-Chanh Phu Hoa', N'$2a$11$jkpWEw.9zP6jiKnIjsIeb.Qrj/cn/gEM1NxyHyL0kelbNSeYNDa5G', 1, NULL, CAST(N'2022-06-23T15:43:03.4604427' AS DateTime2), NULL, NULL, NULL, 1, NULL, CAST(N'2022-06-23T15:42:12.5258577' AS DateTime2), CAST(N'2022-06-23T15:48:24.0442760' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[Account] ([Id], [FullName], [Gender], [DOB], [Email], [PhoneNumber], [Address], [PasswordHash], [Role], [VerificationToken], [VerifiedTime], [ResetToken], [ResetTokenExpireTime], [PasswordResetTime], [IsActive], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (3, N'System User 2', 0, CAST(N'2000-12-31T00:00:00.0000000' AS DateTime2), N'systemuser2@forthechildren.com', N'0123456789', N'Bình Dương-Bến Cát-156 KP4', N'$2a$11$kb5kyOiSDNC/jcedFk/ec.SDYipqG3wjt4i3O4XfcjkZTFX/d8NQa', 1, NULL, CAST(N'2022-06-23T15:44:31.3544283' AS DateTime2), NULL, NULL, NULL, 1, NULL, CAST(N'2022-06-23T15:44:17.3776595' AS DateTime2), CAST(N'2022-06-23T15:48:50.8303169' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[Account] ([Id], [FullName], [Gender], [DOB], [Email], [PhoneNumber], [Address], [PasswordHash], [Role], [VerificationToken], [VerifiedTime], [ResetToken], [ResetTokenExpireTime], [PasswordResetTime], [IsActive], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (4, N'Trần Hoàng Tiến', 1, CAST(N'1999-10-03T00:00:00.0000000' AS DateTime2), N'thtien0310@gmail.com', N'0373831808', N'Binh Duong-Ben Cat-Chanh Phu Hoa', N'$2a$11$Uui4GcJzaYqD.4w9Y2npRefVbZHbI6suLvTMkZ.tOr/GhDjdfVx32', 2, NULL, CAST(N'2022-06-23T16:20:45.4204356' AS DateTime2), NULL, NULL, NULL, 1, NULL, CAST(N'2022-06-23T16:17:27.8811789' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Account] ([Id], [FullName], [Gender], [DOB], [Email], [PhoneNumber], [Address], [PasswordHash], [Role], [VerificationToken], [VerifiedTime], [ResetToken], [ResetTokenExpireTime], [PasswordResetTime], [IsActive], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (5, N'Đào Phương Quỳnh Như', 0, CAST(N'2022-06-01T19:29:39.0000000' AS DateTime2), N'dpqn1999@gmail.com', N'0346788345', N'HCM-Củ Chi-ABC', N'$2a$11$b6ixS4H2cjeuvpTQw3mSROoUDrJIGrk6wJrkyMShVp57UIgpgwxK6', 2, NULL, CAST(N'2022-06-24T12:30:24.9136693' AS DateTime2), NULL, NULL, NULL, 1, N'admin@forthechildren.com', CAST(N'2022-06-24T12:30:24.9136685' AS DateTime2), CAST(N'2022-06-24T12:30:25.1992147' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[Account] ([Id], [FullName], [Gender], [DOB], [Email], [PhoneNumber], [Address], [PasswordHash], [Role], [VerificationToken], [VerifiedTime], [ResetToken], [ResetTokenExpireTime], [PasswordResetTime], [IsActive], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (6, N'Thành Trần', 1, CAST(N'2010-06-09T19:32:19.0000000' AS DateTime2), N'thanhtran@gmail.com', N'0372384268', N'BD-EIU-EIU', N'$2a$11$YKRSWVaRPKobcasE7Lht5Oim/J5sFUfaF9M05g7hgnU3fWT8bYYTO', 2, NULL, CAST(N'2022-06-24T12:32:46.2922176' AS DateTime2), NULL, NULL, NULL, 1, N'admin@forthechildren.com', CAST(N'2022-06-24T12:32:46.2922171' AS DateTime2), CAST(N'2022-06-24T12:32:46.4681631' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[Account] ([Id], [FullName], [Gender], [DOB], [Email], [PhoneNumber], [Address], [PasswordHash], [Role], [VerificationToken], [VerifiedTime], [ResetToken], [ResetTokenExpireTime], [PasswordResetTime], [IsActive], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (7, N'Nhân Ngô', 1, CAST(N'2022-06-29T19:33:10.0000000' AS DateTime2), N'ngohoainhan1999@gmail.com', N'0457344466', N'BD-TA-BC', N'$2a$11$.9Ds09vBEHP4LPhPt06aLuNWoLnVpJC2S.4RT2PGuWkdy/QbGFUX6', 2, NULL, CAST(N'2022-06-24T12:33:46.2699201' AS DateTime2), NULL, NULL, NULL, 1, N'admin@forthechildren.com', CAST(N'2022-06-24T12:33:46.2699195' AS DateTime2), CAST(N'2022-06-24T12:33:46.4380960' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[Account] ([Id], [FullName], [Gender], [DOB], [Email], [PhoneNumber], [Address], [PasswordHash], [Role], [VerificationToken], [VerifiedTime], [ResetToken], [ResetTokenExpireTime], [PasswordResetTime], [IsActive], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (8, N'Thanh Nguyễn', 1, CAST(N'2013-06-12T19:35:37.0000000' AS DateTime2), N'thanhnguyen@eiu.edu.vn', N'0427934694', N'ĐN-BH-HDFL', N'$2a$11$V6W9SJG/IFjXlWdGO6N/j.JPH2ViCB56oXfNDKdi27OfGNG13gLDK', 2, NULL, CAST(N'2022-06-24T12:36:14.5911285' AS DateTime2), NULL, NULL, NULL, 1, N'admin@forthechildren.com', CAST(N'2022-06-24T12:36:14.5911281' AS DateTime2), CAST(N'2022-06-24T12:36:14.7570317' AS DateTime2), N'admin@forthechildren.com', 0)
SET IDENTITY_INSERT [dbo].[Account] OFF
GO
SET IDENTITY_INSERT [dbo].[Changelog] ON 

INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (1, N'Register - Register successfully with Email: admin@gmail.com', N'Account', N'', CAST(N'2022-06-23T15:11:15.7968534' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (2, N'VerifyEmail - VerifyEmail successfully with Email: admin@gmail.com', N'Account', N'', CAST(N'2022-06-23T15:13:13.7325857' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (3, N'Register - Register successfully with Email: systemuser1@forthechildren.com', N'Account', N'', CAST(N'2022-06-23T15:42:15.3546201' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (4, N'VerifyEmail - VerifyEmail successfully with Email: systemuser1@forthechildren.com', N'Account', N'', CAST(N'2022-06-23T15:43:03.4669794' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (5, N'Register - Register successfully with Email: systemuser2@forthechildren.com', N'Account', N'', CAST(N'2022-06-23T15:44:20.1458089' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (6, N'VerifyEmail - VerifyEmail successfully with Email: systemuser2@forthechildren.com', N'Account', N'', CAST(N'2022-06-23T15:44:31.3654935' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (7, N'UpdateAccount - UpdateAccount successfully with Id: 2', N'Account', N'admin@gmail.com', CAST(N'2022-06-23T15:48:24.0020335' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (8, N'UpdateRole - UpdateRole successfully with Id: 2', N'Account', N'admin@gmail.com', CAST(N'2022-06-23T15:48:24.0262700' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (9, N'ActivateAccount - ActivateAccount successfully with Id: 2', N'Account', N'admin@gmail.com', CAST(N'2022-06-23T15:48:24.0470273' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (10, N'UpdateAccount - UpdateAccount successfully with Id: 3', N'Account', N'admin@gmail.com', CAST(N'2022-06-23T15:48:50.7862924' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (11, N'UpdateRole - UpdateRole successfully with Id: 3', N'Account', N'admin@gmail.com', CAST(N'2022-06-23T15:48:50.8165969' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (12, N'ActivateAccount - ActivateAccount successfully with Id: 3', N'Account', N'admin@gmail.com', CAST(N'2022-06-23T15:48:50.8334670' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (13, N'Register - Register successfully with Email: admin@gmail.com', N'Account', N'', CAST(N'2022-06-23T16:17:30.7017268' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (14, N'VerifyEmail - VerifyEmail successfully with Email: admin@gmail.com', N'Account', N'', CAST(N'2022-06-23T16:20:45.4399827' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (15, N'CreateSupportCategory - CreateSupportCategory successfully with Id: 1', N'SupportCategory', N'admin@forthechildren.com', CAST(N'2022-06-23T16:28:18.3375966' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (16, N'CreateSupportCategory - CreateSupportCategory successfully with Id: 2', N'SupportCategory', N'admin@forthechildren.com', CAST(N'2022-06-23T16:28:25.8401424' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (17, N'CreateSupportCategory - CreateSupportCategory successfully with Id: 3', N'SupportCategory', N'admin@forthechildren.com', CAST(N'2022-06-23T16:28:33.0598292' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (18, N'CreateSupportCategory - CreateSupportCategory successfully with Id: 4', N'SupportCategory', N'admin@forthechildren.com', CAST(N'2022-06-23T16:28:42.2378565' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (19, N'CreateSupportCategory - CreateSupportCategory successfully with Id: 5', N'SupportCategory', N'admin@forthechildren.com', CAST(N'2022-06-23T16:28:47.6336068' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (20, N'CreateSupportCategory - CreateSupportCategory successfully with Id: 6', N'SupportCategory', N'admin@forthechildren.com', CAST(N'2022-06-23T16:29:03.3060939' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (21, N'CreateReportFieldCategory - CreateReportFieldCategory successfully with Id: 1', N'ReportFieldCategory', N'admin@forthechildren.com', CAST(N'2022-06-23T16:29:18.0827523' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (22, N'CreateReportFieldCategory - CreateReportFieldCategory successfully with Id: 2', N'ReportFieldCategory', N'admin@forthechildren.com', CAST(N'2022-06-23T16:29:21.0117904' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (23, N'CreateReportFieldCategory - CreateReportFieldCategory successfully with Id: 3', N'ReportFieldCategory', N'admin@forthechildren.com', CAST(N'2022-06-23T16:29:23.8394505' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (24, N'CreateReportFieldCategory - CreateReportFieldCategory successfully with Id: 4', N'ReportFieldCategory', N'admin@forthechildren.com', CAST(N'2022-06-23T16:29:26.4160707' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (25, N'CreateReportFieldCategory - CreateReportFieldCategory successfully with Id: 5', N'ReportFieldCategory', N'admin@forthechildren.com', CAST(N'2022-06-23T16:29:29.3937579' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (26, N'CreateReportFieldCategory - CreateReportFieldCategory successfully with Id: 6', N'ReportFieldCategory', N'admin@forthechildren.com', CAST(N'2022-06-23T16:31:12.3730100' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (27, N'CreateChildrenProfile - CreateChildrenProfile successfully with Id: 1', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-23T16:36:49.0514760' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (28, N'UploadChildrenProfileImage - UploadChildrenProfileImage successfully with Id: 1', N'ChildrenProfileImage', N'', CAST(N'2022-06-23T16:36:49.1262638' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (29, N'CreateReport - CreateReport successfully with Id: 1', N'Report', N'thtien0310@gmail.com', CAST(N'2022-06-23T16:51:55.9464105' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (30, N'CreateNotification - CreateNotification successfully with Id: 1', N'Notification', N'thtien0310@gmail.com', CAST(N'2022-06-23T16:51:56.0299336' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (31, N'ApproveReport - ApproveReport successfully with Id: 1', N'Report', N'admin@forthechildren.com', CAST(N'2022-06-23T17:02:17.8353474' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (32, N'CreateNotification - CreateNotification successfully with Id: 2', N'Notification', N'admin@forthechildren.com', CAST(N'2022-06-23T17:02:17.8495864' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (33, N'ApproveReportDetail - ApproveReportDetail successfully with Id: 1', N'ReportDetail', N'', CAST(N'2022-06-23T17:17:38.6250480' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (34, N'ApproveReportDetail - ApproveReportDetail successfully with Id: 1', N'ReportDetail', N'', CAST(N'2022-06-23T17:20:37.0516870' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (35, N'ApproveReportDetail - ApproveReportDetail successfully with Id: 1', N'ReportDetail', N'', CAST(N'2022-06-23T17:22:27.4520935' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (36, N'ApproveReportDetail - ApproveReportDetail successfully with Id: 1', N'ReportDetail', N'', CAST(N'2022-06-23T17:23:32.1525022' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (37, N'ApproveReportDetail - ApproveReportDetail successfully with Id: 1', N'ReportDetail', N'', CAST(N'2022-06-23T17:23:45.3185891' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (38, N'ApproveReportDetail - ApproveReportDetail successfully with Id: 1', N'ReportDetail', N'', CAST(N'2022-06-23T17:25:08.6823291' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (39, N'CreateNotification - CreateNotification successfully with Id: 3', N'Notification', N'', CAST(N'2022-06-23T17:25:17.8679541' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (40, N'CreateFavorite - CreateFavorite successfully with Id: 1', N'Favorite', N'thtien0310@gmail.com', CAST(N'2022-06-24T00:31:53.8844802' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (41, N'UploadChildrenProfileImage - UploadChildrenProfileImage successfully with Id: 2', N'ChildrenProfileImage', N'', CAST(N'2022-06-24T00:46:23.6183167' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (42, N'UploadChildrenProfileImage - UploadChildrenProfileImage successfully with Id: 3', N'ChildrenProfileImage', N'', CAST(N'2022-06-24T00:46:28.8590089' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (43, N'UploadChildrenProfileImage - UploadChildrenProfileImage successfully with Id: 4', N'ChildrenProfileImage', N'', CAST(N'2022-06-24T00:46:38.2170630' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (44, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 5', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T00:47:04.7748171' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (45, N'UploadChildrenProfileImage - UploadChildrenProfileImage successfully with Id: 5', N'ChildrenProfileImage', N'', CAST(N'2022-06-24T00:47:04.8094155' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (46, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 7', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T00:48:02.6004487' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (47, N'UploadChildrenProfileImage - UploadChildrenProfileImage successfully with Id: 6', N'ChildrenProfileImage', N'', CAST(N'2022-06-24T00:48:02.6308497' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (48, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 9', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T00:48:23.2674741' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (49, N'UploadChildrenProfileImage - UploadChildrenProfileImage successfully with Id: 7', N'ChildrenProfileImage', N'', CAST(N'2022-06-24T00:48:23.2975123' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (50, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 2', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T00:49:15.6947776' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (51, N'UploadChildrenProfileImage - UploadChildrenProfileImage successfully with Id: 8', N'ChildrenProfileImage', N'', CAST(N'2022-06-24T00:49:15.7212640' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (52, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 3', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T00:49:25.0229190' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (53, N'UploadChildrenProfileImage - UploadChildrenProfileImage successfully with Id: 9', N'ChildrenProfileImage', N'', CAST(N'2022-06-24T00:49:25.0508854' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (54, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 4', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T00:49:39.5415340' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (55, N'UploadChildrenProfileImage - UploadChildrenProfileImage successfully with Id: 10', N'ChildrenProfileImage', N'', CAST(N'2022-06-24T00:49:39.5962215' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (56, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 6', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T00:50:05.3536587' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (57, N'UploadChildrenProfileImage - UploadChildrenProfileImage successfully with Id: 11', N'ChildrenProfileImage', N'', CAST(N'2022-06-24T00:50:05.3926207' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (58, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 1', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T00:53:33.5064039' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (59, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 2', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T00:54:03.0534571' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (60, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 2', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T00:54:23.3210577' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (61, N'CreateFavorite - CreateFavorite successfully with Id: 2', N'Favorite', N'admin@forthechildren.com', CAST(N'2022-06-24T00:54:36.7085476' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (62, N'DeleteFavorite - DeleteFavorite successfully with Id: 2', N'Favorite', N'admin@forthechildren.com', CAST(N'2022-06-24T00:54:42.5614165' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (63, N'CreateDonation - CreateDonation successfully with Id: 1', N'Donation', N'thtien0310@gmail.com', CAST(N'2022-06-24T01:00:33.1107542' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (64, N'CreateNotification - CreateNotification successfully with Id: 4', N'Notification', N'thtien0310@gmail.com', CAST(N'2022-06-24T01:00:33.1816802' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (65, N'CreateAccount - CreateAccount successfully with Id: 5', N'Account', N'admin@forthechildren.com', CAST(N'2022-06-24T12:30:25.1347223' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (66, N'UpdateRole - UpdateRole successfully with Id: 5', N'Account', N'admin@forthechildren.com', CAST(N'2022-06-24T12:30:25.2086367' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (67, N'CreateAccount - CreateAccount successfully with Id: 6', N'Account', N'admin@forthechildren.com', CAST(N'2022-06-24T12:32:46.4494091' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (68, N'UpdateRole - UpdateRole successfully with Id: 6', N'Account', N'admin@forthechildren.com', CAST(N'2022-06-24T12:32:46.4740948' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (69, N'CreateAccount - CreateAccount successfully with Id: 7', N'Account', N'admin@forthechildren.com', CAST(N'2022-06-24T12:33:46.4194254' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (70, N'UpdateRole - UpdateRole successfully with Id: 7', N'Account', N'admin@forthechildren.com', CAST(N'2022-06-24T12:33:46.4443950' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (71, N'CreateAccount - CreateAccount successfully with Id: 8', N'Account', N'admin@forthechildren.com', CAST(N'2022-06-24T12:36:14.7338244' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (72, N'UpdateRole - UpdateRole successfully with Id: 8', N'Account', N'admin@forthechildren.com', CAST(N'2022-06-24T12:36:14.7632235' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (73, N'CreateDonation - CreateDonation successfully with Id: 2', N'Donation', N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:16.7537971' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (74, N'CreateNotification - CreateNotification successfully with Id: 5', N'Notification', N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:16.8009890' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (75, N'CreateDonation - CreateDonation successfully with Id: 3', N'Donation', N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:21.1779298' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (76, N'CreateNotification - CreateNotification successfully with Id: 6', N'Notification', N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:21.1963081' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (77, N'CreateDonation - CreateDonation successfully with Id: 4', N'Donation', N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:24.6735367' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (78, N'CreateNotification - CreateNotification successfully with Id: 7', N'Notification', N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:24.6926737' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (79, N'CreateDonation - CreateDonation successfully with Id: 5', N'Donation', N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:31.7143680' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (80, N'CreateNotification - CreateNotification successfully with Id: 8', N'Notification', N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:31.7381478' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (81, N'CreateDonation - CreateDonation successfully with Id: 6', N'Donation', N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:35.9156723' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (82, N'CreateNotification - CreateNotification successfully with Id: 9', N'Notification', N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:35.9344847' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (83, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 3', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T12:45:21.5726161' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (84, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 4', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T12:45:25.6540603' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (85, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 5', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T12:45:29.9971565' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (86, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 6', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T12:45:37.5682588' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (87, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 7', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T12:45:42.0401667' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (88, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 8', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T12:45:45.9813017' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (89, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 9', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T12:45:49.2892634' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (90, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 10', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T12:45:53.0229153' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (91, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 11', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T12:45:57.8378363' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (92, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 12', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T12:46:02.1132736' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (93, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 14', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T12:46:05.2057273' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (94, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 16', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T12:46:08.5710904' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (95, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 20', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T12:46:12.1468936' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (96, N'UpdateChildrenProfile - UpdateChildrenProfile successfully with Id: 18', N'ChildrenProfile', N'admin@forthechildren.com', CAST(N'2022-06-24T12:46:21.1801033' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (97, N'CreateDonation - CreateDonation successfully with Id: 7', N'Donation', N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:40.7198855' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (98, N'CreateNotification - CreateNotification successfully with Id: 10', N'Notification', N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:40.7977435' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (99, N'CreateDonation - CreateDonation successfully with Id: 8', N'Donation', N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:44.1499261' AS DateTime2), NULL, NULL, 0)
GO
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (100, N'CreateNotification - CreateNotification successfully with Id: 11', N'Notification', N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:44.1634583' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (101, N'CreateDonation - CreateDonation successfully with Id: 9', N'Donation', N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:46.2109939' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (102, N'CreateNotification - CreateNotification successfully with Id: 12', N'Notification', N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:46.2150561' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (103, N'CreateDonation - CreateDonation successfully with Id: 10', N'Donation', N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:49.9477183' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (104, N'CreateNotification - CreateNotification successfully with Id: 13', N'Notification', N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:49.9572629' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (105, N'CreateDonation - CreateDonation successfully with Id: 11', N'Donation', N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:54.4902257' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (106, N'CreateNotification - CreateNotification successfully with Id: 14', N'Notification', N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:54.4934972' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (107, N'CreateDonation - CreateDonation successfully with Id: 12', N'Donation', N'thanhtran@gmail.com', CAST(N'2022-06-24T12:54:23.1030098' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (108, N'CreateNotification - CreateNotification successfully with Id: 15', N'Notification', N'thanhtran@gmail.com', CAST(N'2022-06-24T12:54:23.1117485' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (109, N'CreateDonation - CreateDonation successfully with Id: 13', N'Donation', N'thanhtran@gmail.com', CAST(N'2022-06-24T12:54:25.4890096' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (110, N'CreateNotification - CreateNotification successfully with Id: 16', N'Notification', N'thanhtran@gmail.com', CAST(N'2022-06-24T12:54:25.4990063' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (111, N'CreateDonation - CreateDonation successfully with Id: 14', N'Donation', N'ngohoainhan1999@gmail.com', CAST(N'2022-06-24T12:54:46.3475112' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (112, N'CreateNotification - CreateNotification successfully with Id: 17', N'Notification', N'ngohoainhan1999@gmail.com', CAST(N'2022-06-24T12:54:46.3566032' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (113, N'CreateDonation - CreateDonation successfully with Id: 15', N'Donation', N'ngohoainhan1999@gmail.com', CAST(N'2022-06-24T12:54:48.2000971' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (114, N'CreateNotification - CreateNotification successfully with Id: 18', N'Notification', N'ngohoainhan1999@gmail.com', CAST(N'2022-06-24T12:54:48.2051027' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (115, N'CreateDonation - CreateDonation successfully with Id: 16', N'Donation', N'ngohoainhan1999@gmail.com', CAST(N'2022-06-24T12:54:50.6731469' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Changelog] ([Id], [API], [Service], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (116, N'CreateNotification - CreateNotification successfully with Id: 19', N'Notification', N'ngohoainhan1999@gmail.com', CAST(N'2022-06-24T12:54:50.6759209' AS DateTime2), NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[Changelog] OFF
GO
SET IDENTITY_INSERT [dbo].[ChildrenProfile] ON 

INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (1, N'Nguyễn Hằng', 0, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'Củ Chi-TP Hồ Chí Minh-Bến Than', N'Củ Chi-TP Hồ Chí Minh', NULL, 0, NULL, NULL, CAST(N'2022-06-24T00:53:33.4328002' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (2, N'Liên Bảo', 0, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'Củ Chi-TP Hồ Chí Minh-Bến Than', N'Củ Chi-TP Hồ Chí Minh', NULL, 0, NULL, NULL, CAST(N'2022-06-24T00:54:23.2649436' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (3, N'Duy Hữu', 1, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'TP Hồ Chí Minh-Củ Chi-Bến Than', N'TP Hồ Chí Minh-Củ Chi', NULL, 0, NULL, NULL, CAST(N'2022-06-24T12:45:21.4545464' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (4, N'Hương Đồng', 0, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'TP Hồ Chí Minh-Củ Chi-Bến Than', N'TP Hồ Chí Minh-Củ Chi', NULL, 0, NULL, NULL, CAST(N'2022-06-24T12:45:25.6382750' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (5, N'Dương Âu', 1, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'TP Hồ Chí Minh-Củ Chi-Bến Than', N'TP Hồ Chí Minh-Củ Chi', NULL, 1, NULL, NULL, CAST(N'2022-06-24T12:45:29.9858443' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (6, N'Oanh Vân', 0, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'TP Hồ Chí Minh-Củ Chi-Bến Than', N'TP Hồ Chí Minh-Củ Chi', NULL, 0, NULL, NULL, CAST(N'2022-06-24T12:45:37.5519548' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (7, N'Tân Việt', 1, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'TP Hồ Chí Minh-Củ Chi-Bến Than', N'TP Hồ Chí Minh-Củ Chi', NULL, 1, NULL, NULL, CAST(N'2022-06-24T12:45:41.9912160' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (8, N'Diễm Đỗ', 0, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'Củ Chi-TP Hồ Chí Minh-Bến Than', N'Củ Chi-TP Hồ Chí Minh', NULL, 0, NULL, NULL, CAST(N'2022-06-24T12:45:45.9429782' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (9, N'Minh Kiến', 1, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'TP Hồ Chí Minh-Củ Chi-Bến Than', N'TP Hồ Chí Minh-Củ Chi', NULL, 1, NULL, NULL, CAST(N'2022-06-24T12:45:49.2588370' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (10, N'Hảo Hoài', 1, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'Củ Chi-TP Hồ Chí Minh-Bến Than', N'Củ Chi-TP Hồ Chí Minh', NULL, 1, NULL, NULL, CAST(N'2022-06-24T12:45:52.9821609' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (11, N'Huyền Nguyễn', 0, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'Củ Chi-TP Hồ Chí Minh-Bến Than', N'Củ Chi-TP Hồ Chí Minh', NULL, 0, NULL, NULL, CAST(N'2022-06-24T12:45:57.8145985' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (12, N'Mạnh Thông', 1, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'Củ Chi-TP Hồ Chí Minh-Bến Than', N'Củ Chi-TP Hồ Chí Minh', NULL, 1, NULL, NULL, CAST(N'2022-06-24T12:46:02.0955378' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (13, N'Đăng Hạo', 1, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'TP Hồ Chí Minh-Củ Chi-Bến Than', N'TP Hồ Chí Minh-Củ Chi', NULL, 1, N'admin@forthechildren.com', CAST(N'2022-06-23T16:36:48.9708977' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (14, N'Tú Mộc', 0, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'Củ Chi-TP Hồ Chí Minh-Bến Than', N'Củ Chi-TP Hồ Chí Minh', NULL, 1, NULL, NULL, CAST(N'2022-06-24T12:46:05.1969673' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (15, N'Trang Mẫn', 0, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'TP Hồ Chí Minh-Củ Chi-Bến Than', N'TP Hồ Chí Minh-Củ Chi', NULL, 1, N'admin@forthechildren.com', CAST(N'2022-06-23T16:36:48.9708977' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (16, N'Kiên Anh', 1, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'Củ Chi-TP Hồ Chí Minh-Bến Than', N'Củ Chi-TP Hồ Chí Minh', NULL, 1, NULL, NULL, CAST(N'2022-06-24T12:46:08.5427570' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (17, N'Tâm Dương', 0, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'TP Hồ Chí Minh-Củ Chi-Bến Than', N'TP Hồ Chí Minh-Củ Chi', NULL, 0, N'admin@forthechildren.com', CAST(N'2022-06-23T16:36:48.9708977' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (18, N'Trung Thành', 1, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'Củ Chi-TP Hồ Chí Minh-Bến Than', N'Củ Chi-TP Hồ Chí Minh', NULL, 0, NULL, NULL, CAST(N'2022-06-24T12:46:21.1489612' AS DateTime2), N'admin@forthechildren.com', 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (19, N'Xuân Thạch', 0, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'TP Hồ Chí Minh-Củ Chi-Bến Than', N'TP Hồ Chí Minh-Củ Chi', NULL, 1, N'admin@forthechildren.com', CAST(N'2022-06-23T16:36:48.9708977' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[ChildrenProfile] ([Id], [FullName], [Gender], [DOB], [Age], [GuardianPhoneNumber], [GuardianName], [DetailAddress], [PublicAddress], [Circumstance], [Status], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (20, N'An Chu', 1, CAST(N'2011-01-18T23:36:10.0000000' AS DateTime2), 11, NULL, NULL, N'Củ Chi-TP Hồ Chí Minh-Bến Than', N'Củ Chi-TP Hồ Chí Minh', NULL, 0, NULL, NULL, CAST(N'2022-06-24T12:46:12.1300926' AS DateTime2), N'admin@forthechildren.com', 0)
SET IDENTITY_INSERT [dbo].[ChildrenProfile] OFF
GO
SET IDENTITY_INSERT [dbo].[ChildrenProfileImage] ON 

INSERT [dbo].[ChildrenProfileImage] ([Id], [ChildrenProfileId], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (1, 1, N'wwwroot\ChildrenProfileImages\1_23_06_2022_11_36_490.png', NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileImage] ([Id], [ChildrenProfileId], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (2, 5, N'wwwroot\ChildrenProfileImages\5_24_06_2022_07_46_230.png', NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileImage] ([Id], [ChildrenProfileId], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (3, 5, N'wwwroot\ChildrenProfileImages\5_24_06_2022_07_46_280.png', NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileImage] ([Id], [ChildrenProfileId], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (4, 5, N'wwwroot\ChildrenProfileImages\5_24_06_2022_07_46_380.png', NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileImage] ([Id], [ChildrenProfileId], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (5, 5, N'wwwroot\ChildrenProfileImages\5_24_06_2022_07_47_040.png', NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileImage] ([Id], [ChildrenProfileId], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (6, 7, N'wwwroot\ChildrenProfileImages\7_24_06_2022_07_48_020.png', NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileImage] ([Id], [ChildrenProfileId], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (7, 9, N'wwwroot\ChildrenProfileImages\9_24_06_2022_07_48_230.png', NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileImage] ([Id], [ChildrenProfileId], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (8, 2, N'wwwroot\ChildrenProfileImages\2_24_06_2022_07_49_150.png', NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileImage] ([Id], [ChildrenProfileId], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (9, 3, N'wwwroot\ChildrenProfileImages\3_24_06_2022_07_49_250.png', NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileImage] ([Id], [ChildrenProfileId], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (10, 4, N'wwwroot\ChildrenProfileImages\4_24_06_2022_07_49_390.png', NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileImage] ([Id], [ChildrenProfileId], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (11, 6, N'wwwroot\ChildrenProfileImages\6_24_06_2022_07_50_050.png', NULL, NULL, NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[ChildrenProfileImage] OFF
GO
SET IDENTITY_INSERT [dbo].[ChildrenProfileSupportCategory] ON 

INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (1, 1, 2, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (2, 1, 1, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (3, 2, 3, NULL, NULL, NULL, NULL, 1)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (4, 2, 2, NULL, NULL, NULL, NULL, 1)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (5, 2, 3, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (6, 2, 2, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (7, 2, 4, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (8, 3, 2, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (9, 3, 5, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (10, 3, 6, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (11, 4, 1, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (12, 4, 4, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (13, 4, 2, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (14, 5, 3, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (15, 5, 6, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (16, 5, 5, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (17, 6, 3, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (18, 6, 1, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (19, 6, 2, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (20, 7, 3, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (21, 7, 2, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (22, 7, 5, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (23, 8, 2, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (24, 8, 5, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (25, 8, 6, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (26, 9, 1, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (27, 9, 4, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (28, 10, 5, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (29, 10, 3, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (30, 11, 1, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (31, 11, 4, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (32, 11, 2, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (33, 11, 5, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (34, 12, 3, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (35, 14, 2, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (36, 16, 2, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (37, 16, 5, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (38, 16, 4, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (39, 16, 1, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (40, 20, 2, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (41, 20, 5, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (42, 20, 3, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (43, 20, 6, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (44, 18, 3, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (45, 18, 6, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (46, 18, 2, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (47, 18, 5, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (48, 18, 4, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ChildrenProfileSupportCategory] ([Id], [ChildrenProfileId], [SupportCategoryId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (49, 18, 1, NULL, NULL, NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[ChildrenProfileSupportCategory] OFF
GO
SET IDENTITY_INSERT [dbo].[Donation] ON 

INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (1, 4, 1, 0, N'nothing', N'thtien0310@gmail.com', CAST(N'2022-06-24T01:00:32.9650237' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (2, 8, 2, 0, N'1', N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:16.6651958' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (3, 8, 2, 0, N'1', N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:21.1582552' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (4, 8, 2, 0, N'1', N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:24.6514997' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (5, 8, 1, 0, N'2', N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:31.7081900' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (6, 8, 1, 0, N'2', N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:35.9085329' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (7, 5, 20, 0, NULL, N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:40.5775720' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (8, 5, 20, 0, NULL, N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:44.1443926' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (9, 5, 20, 0, NULL, N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:46.2046282' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (10, 5, 18, 0, NULL, N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:49.9410835' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (11, 5, 18, 0, NULL, N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:54.4691218' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (12, 6, 6, 0, NULL, N'thanhtran@gmail.com', CAST(N'2022-06-24T12:54:23.0984617' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (13, 6, 6, 0, NULL, N'thanhtran@gmail.com', CAST(N'2022-06-24T12:54:25.4809570' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (14, 7, 7, 0, NULL, N'ngohoainhan1999@gmail.com', CAST(N'2022-06-24T12:54:46.3367657' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (15, 7, 7, 0, NULL, N'ngohoainhan1999@gmail.com', CAST(N'2022-06-24T12:54:48.1950959' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Donation] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (16, 7, 7, 0, NULL, N'ngohoainhan1999@gmail.com', CAST(N'2022-06-24T12:54:50.6704628' AS DateTime2), NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[Donation] OFF
GO
SET IDENTITY_INSERT [dbo].[DonationDetail] ON 

INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (1, 1, 2, 0, N'clothes', NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (2, 1, 1, 0, N'food', NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (3, 2, 2, 0, N'1', NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (4, 3, 3, 0, N'2', NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (5, 4, 4, 0, N'3', NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (6, 5, 1, 0, N'2', NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (7, 6, 2, 0, N'3', NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (8, 7, 2, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (9, 7, 5, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (10, 8, 3, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (11, 8, 5, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (12, 9, 6, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (13, 10, 2, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (14, 10, 5, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (15, 10, 4, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (16, 11, 3, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (17, 11, 6, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (18, 11, 2, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (19, 11, 5, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (20, 11, 4, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (21, 11, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (22, 12, 2, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (23, 13, 3, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (24, 14, 5, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (25, 15, 3, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[DonationDetail] ([Id], [DonationId], [SupportCategoryId], [Status], [Note], [ImagePath], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (26, 16, 2, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[DonationDetail] OFF
GO
SET IDENTITY_INSERT [dbo].[Favorite] ON 

INSERT [dbo].[Favorite] ([Id], [ChildrenProfileId], [AccountId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (1, 1, 4, N'thtien0310@gmail.com', CAST(N'2022-06-24T00:31:53.7911044' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Favorite] ([Id], [ChildrenProfileId], [AccountId], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (2, 2, 1, N'admin@forthechildren.com', CAST(N'2022-06-24T00:54:36.6596588' AS DateTime2), CAST(N'2022-06-24T00:54:42.5507084' AS DateTime2), N'admin@forthechildren.com', 1)
SET IDENTITY_INSERT [dbo].[Favorite] OFF
GO
SET IDENTITY_INSERT [dbo].[Notification] ON 

INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (1, 4, N'CreateReport - CreateReport successfully with Id: 1', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'thtien0310@gmail.com', CAST(N'2022-06-23T16:51:55.9652248' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (2, 4, N'ApproveReport - ApproveReport successfully with Id: 1', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'admin@forthechildren.com', CAST(N'2022-06-23T17:02:17.8428018' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (3, 4, N'ApproveReportDetail - ApproveReportDetail successfully with Id: 1', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'', CAST(N'2022-06-23T17:25:17.7254971' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (4, 4, N'CreateDonation - CreateDonation successfully with Id: 1', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'thtien0310@gmail.com', CAST(N'2022-06-24T01:00:33.1389397' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (5, 8, N'CreateDonation - CreateDonation successfully with Id: 2', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:16.7696275' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (6, 8, N'CreateDonation - CreateDonation successfully with Id: 3', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:21.1903875' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (7, 8, N'CreateDonation - CreateDonation successfully with Id: 4', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:24.6811320' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (8, 8, N'CreateDonation - CreateDonation successfully with Id: 5', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:31.7281515' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (9, 8, N'CreateDonation - CreateDonation successfully with Id: 6', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'thanhnguyen@eiu.edu.vn', CAST(N'2022-06-24T12:41:35.9302010' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (10, 5, N'CreateDonation - CreateDonation successfully with Id: 7', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:40.7621972' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (11, 5, N'CreateDonation - CreateDonation successfully with Id: 8', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:44.1597218' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (12, 5, N'CreateDonation - CreateDonation successfully with Id: 9', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:46.2131141' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (13, 5, N'CreateDonation - CreateDonation successfully with Id: 10', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:49.9518151' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (14, 5, N'CreateDonation - CreateDonation successfully with Id: 11', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'dpqn1999@gmail.com', CAST(N'2022-06-24T12:53:54.4919474' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (15, 6, N'CreateDonation - CreateDonation successfully with Id: 12', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'thanhtran@gmail.com', CAST(N'2022-06-24T12:54:23.1062427' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (16, 6, N'CreateDonation - CreateDonation successfully with Id: 13', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'thanhtran@gmail.com', CAST(N'2022-06-24T12:54:25.4957938' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (17, 7, N'CreateDonation - CreateDonation successfully with Id: 14', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'ngohoainhan1999@gmail.com', CAST(N'2022-06-24T12:54:46.3522907' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (18, 7, N'CreateDonation - CreateDonation successfully with Id: 15', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'ngohoainhan1999@gmail.com', CAST(N'2022-06-24T12:54:48.2025084' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[Notification] ([Id], [AccountId], [Content], [IsSeen], [SeenTime], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (19, 7, N'CreateDonation - CreateDonation successfully with Id: 16', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'ngohoainhan1999@gmail.com', CAST(N'2022-06-24T12:54:50.6745770' AS DateTime2), NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[Notification] OFF
GO
SET IDENTITY_INSERT [dbo].[RefreshToken] ON 

INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (1, 1, N'784722755A9A0E4368E0810B73E4D6C2AFEF802391AC57DD7F56139CC1529C35E1E5C35684CE170E', CAST(N'2022-06-30T15:18:20.9485595' AS DateTime2), CAST(N'2022-06-23T15:18:20.9486056' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (2, 1, N'B9519AE9645784977ACDC2E0022F714B263CC544E147FB2341E1E2087A81439D4C7E5C2CE488B4CE', CAST(N'2022-06-30T15:44:57.4442899' AS DateTime2), CAST(N'2022-06-23T15:44:57.4442902' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (3, 1, N'4C135B7842C6C75D4403F1EF7B4222522AB3EE1D84E4F7FBC91586957E0009D3D27A2BE5F5AB8387', CAST(N'2022-06-30T15:55:48.9716977' AS DateTime2), CAST(N'2022-06-23T15:55:48.9716988' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (4, 4, N'E3355AF0E1ACFBE762468072BD510EF0DFAFD3633A320A223ADAF13408FA13C65B31FE1B0E6B38CF', CAST(N'2022-06-30T16:51:03.5396121' AS DateTime2), CAST(N'2022-06-23T16:51:03.5396126' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (5, 1, N'7A35ECEB0EA6DC5246B16FD9ED8EA9882334041DE0D6DF5E7E42ED5BF471FFA79161323F38E54662', CAST(N'2022-06-30T17:00:19.9688884' AS DateTime2), CAST(N'2022-06-23T17:00:19.9688887' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (6, 4, N'A07BEE60F8282A78A003ECAEE000F6686B07861571F42E20C8773F6160182F996B7E8BC38D974DD8', CAST(N'2022-07-01T00:31:24.6001264' AS DateTime2), CAST(N'2022-06-24T00:31:24.6002601' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (7, 1, N'288C7EF581C0FE8195C3FF61D91D363DDD91E83575E7876062E09A4CFEDF6B70FEBA8846481B55A5', CAST(N'2022-07-01T00:44:07.4885196' AS DateTime2), CAST(N'2022-06-24T00:44:07.4885569' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (8, 4, N'64A5BBD3B61DAE1AAD39F2B6E3056DC1BC16FE30FCA79E39A2BA7FE49924EAB31A3A052520447B65', CAST(N'2022-07-01T01:00:11.7384096' AS DateTime2), CAST(N'2022-06-24T01:00:11.7384111' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (9, 4, N'5C53AD1C803E4D444343AF3E319CE44CBA393B7E5DEACA35154B75BB5682DFAD5E0C17873FBAEBC8', CAST(N'2022-07-01T01:33:48.4085477' AS DateTime2), CAST(N'2022-06-24T01:33:48.4085488' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (10, 1, N'B1417469E6907B192AC86E1EABFE342C2CBB153F984340B4BDE1D3D8C4C5C2052D2C905B31D7481C', CAST(N'2022-07-01T01:34:16.2453247' AS DateTime2), CAST(N'2022-06-24T01:34:16.2453272' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (11, 1, N'00F414D3D66277BA08A350BC74D85DDC838E6F7D3220A7607243D87F16CDD342CA982D1E64AF3509', CAST(N'2022-07-01T12:28:55.1669880' AS DateTime2), CAST(N'2022-06-24T12:28:55.1671016' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (12, 8, N'0EDFA7D5C9E533323FE1B09B0CDEBC69A3757B693850DD7F3701CB474D2405EFCFAC0264EEB75929', CAST(N'2022-07-01T12:39:20.9739917' AS DateTime2), CAST(N'2022-06-24T12:39:20.9739942' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (13, 1, N'0654CD4ABE0DCBC309801C5737786AC03481373886F187FE5371FC5BEFFDB4D2D8DEE3EC2DF3F1E0', CAST(N'2022-07-01T12:44:50.1830773' AS DateTime2), CAST(N'2022-06-24T12:44:50.1830792' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (14, 1, N'E2713AC485AAAE93171973A12AE7AC96F83995D2B1263FD09A324F6123691718D806614CB06E8662', CAST(N'2022-07-01T12:44:50.1841201' AS DateTime2), CAST(N'2022-06-24T12:44:50.1841205' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (15, 5, N'B9A5510E9EF39812BD22212D32ADE83911F1B453BBB190AE1CC441DB14248278CDD11D943BF6A481', CAST(N'2022-07-01T12:53:21.8336716' AS DateTime2), CAST(N'2022-06-24T12:53:21.8337007' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (16, 6, N'C80727918E9D1262C80669D24C7A56177084DE7B9CBE89892BFBE3DB4DB0ED8E83B09989ED280441', CAST(N'2022-07-01T12:54:10.8415042' AS DateTime2), CAST(N'2022-06-24T12:54:10.8415047' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (17, 7, N'FD0B434485511E42EF407D6FE97CEFEAA5094BC32D080E5427907D1E0BEB88DCCF6DE9B24E41A887', CAST(N'2022-07-01T12:54:35.0193571' AS DateTime2), CAST(N'2022-06-24T12:54:35.0193574' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
INSERT [dbo].[RefreshToken] ([Id], [AccountId], [Token], [Expires], [Created], [CreatedByIp], [Revoked], [RevokedByIp], [ReplacedByToken]) VALUES (18, 1, N'42ADF4B403E849E518AA5EEA4BA077AE6F5D1E93AC4CF86A7BE365FD57E05A6D35E8A33C171F85EC', CAST(N'2022-07-01T13:53:58.2165345' AS DateTime2), CAST(N'2022-06-24T13:53:58.2166209' AS DateTime2), N'0.0.0.1', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[RefreshToken] OFF
GO
SET IDENTITY_INSERT [dbo].[Report] ON 

INSERT [dbo].[Report] ([Id], [AccountId], [ChildrenProfileId], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (1, 4, 1, 1, NULL, N'thtien0310@gmail.com', CAST(N'2022-06-23T16:51:55.8616599' AS DateTime2), NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[Report] OFF
GO
SET IDENTITY_INSERT [dbo].[ReportDetail] ON 

INSERT [dbo].[ReportDetail] ([Id], [ReportId], [ReportFieldCategoryId], [ReportInformation], [Status], [Note], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (1, 1, 1, N'Nguyễn Hằng', 2, NULL, NULL, NULL, NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[ReportDetail] OFF
GO
SET IDENTITY_INSERT [dbo].[ReportFieldCategory] ON 

INSERT [dbo].[ReportFieldCategory] ([Id], [Title], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (1, N'fullName', N'admin@forthechildren.com', CAST(N'2022-06-23T16:29:18.0596516' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[ReportFieldCategory] ([Id], [Title], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (2, N'dob', N'admin@forthechildren.com', CAST(N'2022-06-23T16:29:21.0041277' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[ReportFieldCategory] ([Id], [Title], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (3, N'detailAddress', N'admin@forthechildren.com', CAST(N'2022-06-23T16:29:23.8313552' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[ReportFieldCategory] ([Id], [Title], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (4, N'gender', N'admin@forthechildren.com', CAST(N'2022-06-23T16:29:26.4082767' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[ReportFieldCategory] ([Id], [Title], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (5, N'circumstance', N'admin@forthechildren.com', CAST(N'2022-06-23T16:29:29.3885494' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[ReportFieldCategory] ([Id], [Title], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (6, N'guardianName', N'admin@forthechildren.com', CAST(N'2022-06-23T16:31:12.3656398' AS DateTime2), NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[ReportFieldCategory] OFF
GO
SET IDENTITY_INSERT [dbo].[SupportCategory] ON 

INSERT [dbo].[SupportCategory] ([Id], [Title], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (1, N'Food', N'admin@forthechildren.com', CAST(N'2022-06-23T16:28:18.3052474' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[SupportCategory] ([Id], [Title], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (2, N'Clothes', N'admin@forthechildren.com', CAST(N'2022-06-23T16:28:25.8332376' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[SupportCategory] ([Id], [Title], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (3, N'Medical Care', N'admin@forthechildren.com', CAST(N'2022-06-23T16:28:33.0546675' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[SupportCategory] ([Id], [Title], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (4, N'School Stationery', N'admin@forthechildren.com', CAST(N'2022-06-23T16:28:42.2330449' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[SupportCategory] ([Id], [Title], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (5, N'Money', N'admin@forthechildren.com', CAST(N'2022-06-23T16:28:47.6269940' AS DateTime2), NULL, NULL, 0)
INSERT [dbo].[SupportCategory] ([Id], [Title], [CreatedBy], [CreatedTime], [LastModified], [ModifiedBy], [IsDeleted]) VALUES (6, N'Adoption', N'admin@forthechildren.com', CAST(N'2022-06-23T16:29:03.3007261' AS DateTime2), NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[SupportCategory] OFF
GO
ALTER TABLE [dbo].[ChildrenProfileImage]  WITH CHECK ADD  CONSTRAINT [FK_ChildrenProfileImage_ChildrenProfile_ChildrenProfileId] FOREIGN KEY([ChildrenProfileId])
REFERENCES [dbo].[ChildrenProfile] ([Id])
GO
ALTER TABLE [dbo].[ChildrenProfileImage] CHECK CONSTRAINT [FK_ChildrenProfileImage_ChildrenProfile_ChildrenProfileId]
GO
ALTER TABLE [dbo].[ChildrenProfileSupportCategory]  WITH CHECK ADD  CONSTRAINT [FK_ChildrenProfileSupportCategory_ChildrenProfile_ChildrenProfileId] FOREIGN KEY([ChildrenProfileId])
REFERENCES [dbo].[ChildrenProfile] ([Id])
GO
ALTER TABLE [dbo].[ChildrenProfileSupportCategory] CHECK CONSTRAINT [FK_ChildrenProfileSupportCategory_ChildrenProfile_ChildrenProfileId]
GO
ALTER TABLE [dbo].[ChildrenProfileSupportCategory]  WITH CHECK ADD  CONSTRAINT [FK_ChildrenProfileSupportCategory_SupportCategory_SupportCategoryId] FOREIGN KEY([SupportCategoryId])
REFERENCES [dbo].[SupportCategory] ([Id])
GO
ALTER TABLE [dbo].[ChildrenProfileSupportCategory] CHECK CONSTRAINT [FK_ChildrenProfileSupportCategory_SupportCategory_SupportCategoryId]
GO
ALTER TABLE [dbo].[Donation]  WITH CHECK ADD  CONSTRAINT [FK_Donation_Account_AccountId] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Donation] CHECK CONSTRAINT [FK_Donation_Account_AccountId]
GO
ALTER TABLE [dbo].[Donation]  WITH CHECK ADD  CONSTRAINT [FK_Donation_ChildrenProfile_ChildrenProfileId] FOREIGN KEY([ChildrenProfileId])
REFERENCES [dbo].[ChildrenProfile] ([Id])
GO
ALTER TABLE [dbo].[Donation] CHECK CONSTRAINT [FK_Donation_ChildrenProfile_ChildrenProfileId]
GO
ALTER TABLE [dbo].[DonationDetail]  WITH CHECK ADD  CONSTRAINT [FK_DonationDetail_Donation_DonationId] FOREIGN KEY([DonationId])
REFERENCES [dbo].[Donation] ([Id])
GO
ALTER TABLE [dbo].[DonationDetail] CHECK CONSTRAINT [FK_DonationDetail_Donation_DonationId]
GO
ALTER TABLE [dbo].[DonationDetail]  WITH CHECK ADD  CONSTRAINT [FK_DonationDetail_SupportCategory_SupportCategoryId] FOREIGN KEY([SupportCategoryId])
REFERENCES [dbo].[SupportCategory] ([Id])
GO
ALTER TABLE [dbo].[DonationDetail] CHECK CONSTRAINT [FK_DonationDetail_SupportCategory_SupportCategoryId]
GO
ALTER TABLE [dbo].[Favorite]  WITH CHECK ADD  CONSTRAINT [FK_Favorite_Account_AccountId] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Favorite] CHECK CONSTRAINT [FK_Favorite_Account_AccountId]
GO
ALTER TABLE [dbo].[Favorite]  WITH CHECK ADD  CONSTRAINT [FK_Favorite_ChildrenProfile_ChildrenProfileId] FOREIGN KEY([ChildrenProfileId])
REFERENCES [dbo].[ChildrenProfile] ([Id])
GO
ALTER TABLE [dbo].[Favorite] CHECK CONSTRAINT [FK_Favorite_ChildrenProfile_ChildrenProfileId]
GO
ALTER TABLE [dbo].[Notification]  WITH CHECK ADD  CONSTRAINT [FK_Notification_Account_AccountId] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Notification] CHECK CONSTRAINT [FK_Notification_Account_AccountId]
GO
ALTER TABLE [dbo].[RefreshToken]  WITH CHECK ADD  CONSTRAINT [FK_RefreshToken_Account_AccountId] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[RefreshToken] CHECK CONSTRAINT [FK_RefreshToken_Account_AccountId]
GO
ALTER TABLE [dbo].[Report]  WITH CHECK ADD  CONSTRAINT [FK_Report_Account_AccountId] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Report] CHECK CONSTRAINT [FK_Report_Account_AccountId]
GO
ALTER TABLE [dbo].[Report]  WITH CHECK ADD  CONSTRAINT [FK_Report_ChildrenProfile_ChildrenProfileId] FOREIGN KEY([ChildrenProfileId])
REFERENCES [dbo].[ChildrenProfile] ([Id])
GO
ALTER TABLE [dbo].[Report] CHECK CONSTRAINT [FK_Report_ChildrenProfile_ChildrenProfileId]
GO
ALTER TABLE [dbo].[ReportDetail]  WITH CHECK ADD  CONSTRAINT [FK_ReportDetail_Report_ReportId] FOREIGN KEY([ReportId])
REFERENCES [dbo].[Report] ([Id])
GO
ALTER TABLE [dbo].[ReportDetail] CHECK CONSTRAINT [FK_ReportDetail_Report_ReportId]
GO
ALTER TABLE [dbo].[ReportDetail]  WITH CHECK ADD  CONSTRAINT [FK_ReportDetail_ReportFieldCategory_ReportFieldCategoryId] FOREIGN KEY([ReportFieldCategoryId])
REFERENCES [dbo].[ReportFieldCategory] ([Id])
GO
ALTER TABLE [dbo].[ReportDetail] CHECK CONSTRAINT [FK_ReportDetail_ReportFieldCategory_ReportFieldCategoryId]
GO
/****** Object:  StoredProcedure [dbo].[ChildrenProfileSuportCategories_Delete]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
/****** Object:  StoredProcedure [dbo].[DonationDetails_Delete]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DonationDetails_Delete]  
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
/****** Object:  StoredProcedure [dbo].[Favorites_Delete]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

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
/****** Object:  StoredProcedure [dbo].[ReportDetails_Delete]    Script Date: 24/06/2022 11:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

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
