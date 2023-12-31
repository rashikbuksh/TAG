-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2024 at 07:41 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `think_and_get`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `url`) VALUES
(1, 'gg', 'https://www.google.com'),
(2, 'Another', 'https://www.google.com'),
(3, 'gg 2', 'https://www.google.com'),
(12, 'gg 3', 'https://www.google.com'),
(13, 'Shoe', 'https://www.google.com'),
(14, 'Bag', 'https://www.google.com'),
(15, 'oil', 'https://www.google.com'),
(16, 'Cha Pata', 'https://www.google.com'),
(17, 'Sauce', 'https://tailwindcss.com/docs/object-fit');

-- --------------------------------------------------------

--
-- Table structure for table `customer_profile`
--

CREATE TABLE `customer_profile` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `point` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `shipping_address` varchar(255) DEFAULT NULL,
  `total_order` int(11) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `review_count` int(11) DEFAULT NULL,
  `offer` varchar(255) DEFAULT NULL,
  `access` varchar(255) NOT NULL,
  `active_status` tinyint(1) DEFAULT NULL,
  `refer_code` varchar(255) NOT NULL,
  `refer_status` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_profile`
--

INSERT INTO `customer_profile` (`id`, `name`, `image`, `point`, `level`, `user_name`, `password`, `phone`, `email`, `shipping_address`, `total_order`, `address`, `review_count`, `offer`, `access`, `active_status`, `refer_code`, `refer_status`, `profile_picture`) VALUES
(1, 'hasib', '[value-3]', '[value-4]', '[value-5]', 'hasibarrafiulfahim', 'hasib1234', '[value-8]', 'hasibarrafiulfahim@gmail.com', '[value-10]', 0, '0', 0, '[value-14]', 'customer', 0, '', NULL, NULL),
(2, 'Rashik Buksh', NULL, NULL, NULL, NULL, 'rafsan123', NULL, 'rashikbuksh@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', NULL, NULL),
(3, 'Buksh', NULL, NULL, NULL, 'buksh', 'rafsan123', '01684545118', 'rashik1@gmail.com', '730/5/1, Block-C, Khilgaon, Dhaka', 1, '2', 3, 'no', 'shopper', NULL, '', 'referred', NULL),
(6, 'Rashik Buksh', NULL, NULL, NULL, 'rbr', 'rafsan123', '01709305072', 'rbr@gmail.com', '730/5/1, Block-C, Khilgaon, Dhaka', NULL, NULL, NULL, NULL, 'customer', NULL, '', 'unreferred', NULL),
(11, 'buksh', NULL, NULL, NULL, NULL, 'buksh1234', NULL, 'buksh@gmail.com', '23.7517979__90.4219168', NULL, NULL, NULL, NULL, 'shopper', NULL, '', NULL, NULL),
(15, 'Rashik Buksh', NULL, NULL, NULL, NULL, 'rafsan123', '01684545112', 'rashikbuksh123@gmail.com', '23.7507983__90.4219536', NULL, NULL, NULL, NULL, 'shopper', NULL, '', NULL, NULL),
(16, 'anik', NULL, NULL, NULL, NULL, '$2b$10$XoJbPYObeFN.dhLLpniv.e6uZbfuORw0YhAaYAXnDvPlfgjpXWk02', NULL, 'anik@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'unreferred', NULL),
(17, 'Anik Store', NULL, NULL, NULL, NULL, '$2b$10$hLJbqslh/frc8Zp/.IyBv.tPItlpdjEmoEzEorlhDmLK8f1bHmI6K', '01684345120', 'anik123@gmail.com', '22.3303507__91.7867411', NULL, 'k block haishahar chittagong', NULL, NULL, 'shopper', 1, '9ikaktaf3rp', 'referred', '1699292263970__121837251.jpg'),
(18, 'RAFID BUKSH', NULL, NULL, NULL, NULL, '$2b$10$59OJMjepWmTnuNbiT5VR3uCK93oHNlBHmWm6GOlRNtsjkkkn7AXUK', NULL, 'rafid@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', NULL, NULL),
(19, 'RAFID BUKSH', NULL, NULL, NULL, NULL, '$2b$10$VeU3tFlgbCpCrsV2CQtMSupS9/JYqhBAMPWXEq7wEnBFj6iQWxZl6', NULL, 'rafid123@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', NULL, NULL),
(20, 'TAG@admin.com', NULL, NULL, NULL, NULL, '$2b$10$1R4tRAPwHpmV6EnGtAStUeJZY8aj0Dt9NR.B2fjgNiXSYkmH5rm46', NULL, 'tag@admin.com', NULL, NULL, NULL, NULL, NULL, 'admin', NULL, 'bo1ntlas7k7', 'unreferred', NULL),
(36, 'Rashik Buksh', NULL, NULL, NULL, NULL, '$2b$10$sAtGIF2DZL.hB8LTMCQ7ZOp2Zdzln6WmbhK7pCrFhEKz46bH/6AF.', '01684545111', 'rashik@gmail.com', '22.3304379__91.7872739', NULL, NULL, NULL, NULL, 'customer', NULL, '1mwoauien49', 'referred', '1699370631335__IMG_4137.JPG'),
(48, 'Rashik Buksh', NULL, NULL, NULL, NULL, '$2b$10$p.NA9WD2M7T/HFzL1kX.wee8biKelsaoe7qNWl/zXHfeHHG2GVErq', '01684545121', 'anik1234567@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, 'kmigen4lv1', NULL, NULL),
(49, 'Towhidul Islam', NULL, NULL, NULL, NULL, '$2b$10$NII3Zsp1lU/4SQt9eM/vv.CufLSYICSlfRHgRceEX55hATtYA.4Pe', '01878601610', 'towhidulislam2.bd@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'referred', NULL),
(52, 'Modarator', NULL, NULL, NULL, NULL, '$2b$10$KFdI.jfOFD5WbZhp.vHdTO6TJMunfxfEum7Hxza9rfnOpqxQxPsKq', '01888888888', 'modarator@tag.com', NULL, NULL, NULL, NULL, NULL, 'modarator', NULL, '', 'unreferred', NULL),
(58, 'Towhidul Islam', NULL, NULL, NULL, NULL, '$2b$10$v6O3JpuXQQ/Ga7wJK0yld.oykAFrwfK1YHsY29FUP16QWUfF0yRsS', '01878611610', 'towhidulislam221.bd@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '68ina65jck', 'referred', NULL),
(65, 'withrefer@gmail.com', NULL, NULL, NULL, NULL, '$2b$10$RsqL5G2UjO8jpqxXayrSgOGXcDJHVGavAE6UkdBVFdG4chKIm6w2m', '01778601610', 'withrefer@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'referred', NULL),
(66, 'withrefer2@gmail.com', NULL, NULL, NULL, NULL, '$2b$10$rzmXcGfaANX0/3GZv0EjyeW8HywOOd4CCeqABvPJMMZ.A7BLGydLq', '01178601610', 'withrefer2@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'referred', NULL),
(67, 'withrefer1@gmail.com', NULL, NULL, NULL, NULL, '$2b$10$rtCitGWvGZn2HrHfN0ppsO5QwYPXdY8kO7TcSyOFvWoy1rt9BaRaq', '01875601610', 'withrefer1@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'referred', NULL),
(68, 'refer1@gmail.com', NULL, NULL, NULL, NULL, '$2b$10$XMHkYt.EpOUKa22esem5qu7xgHq4J8vb74V7d8iFIDbsX3KszWmwG', '01838601610', 'refer1@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'referred', NULL),
(70, 'noterefer@g.com', NULL, NULL, NULL, NULL, '$2b$10$6jELRlPUWVyEzE8begkq5euiBrlZYn4L/Of8Z.pPaf9tsm1MPfO7e', '01878631610', 'noterefer@g.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'unreferred', NULL),
(71, 'r1@g.com', NULL, NULL, NULL, NULL, '$2b$10$RguEkd4D9knGB2Wk37Wi/.HDm/q3.3OH..Vb1ntVQp.O4dlM621nC', '01878602612', 'r1@g.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, 'b47acyx1klp', 'referred', NULL),
(72, 'refbylink@g.com', NULL, NULL, NULL, NULL, '$2b$10$5RMgK8aUvxpztgEQkNMK...ohKcZKW0VE2N5Vjo3CSx1gbbmO3CMm', '01814032120', 'refbylink@g.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'referred', NULL),
(73, 'wrongref@p.com', NULL, NULL, NULL, NULL, '$2b$10$PwOatoHZsK3nquPMBnkK9uCbU1ungUWDOjGd5rKrXzYUq6C3ihJQq', '0187861161', 'wrongref@p.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, 'cw46k460k1m', 'referred', NULL),
(74, 'adasda', NULL, NULL, NULL, NULL, '$2b$10$j/EHcnuo7nTjIi84bJb5nuF4C3nmMMe2j9IdNaAT9WeNmFwVLlS7a', 'sdasd', 'asdasda@daasd', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', NULL, NULL),
(76, 'Towhidul Store', NULL, NULL, NULL, NULL, '$2b$10$BfsPyaAGL5wcR50.PNp51eHjBE6sohrTrqHUM59vrKdiUJftIzAZ6', '01601401607', 'towhidulislam2.bd@gmail.com', '22.3176576__91.7980074', NULL, NULL, NULL, NULL, 'shopper', NULL, '', 'unreferred', '1700676814695__channels4_profile.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `hero_slider`
--

CREATE TABLE `hero_slider` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `slider_position` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hero_slider`
--

INSERT INTO `hero_slider` (`id`, `title`, `subtitle`, `image`, `slider_position`) VALUES
(4, 'Ishan Tea', 'Cha Pata From Sylhet', '1693929901663__20230807_154229.jpg', 'top'),
(6, 'hello', 'hello', '1698599927072__image.jpg', 'top'),
(7, 'sss', 'sss', '1701694046146__download.jpg', 'middel'),
(8, 'Test', 'Test', '1701694701108__7061506.jpg', 'middel');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `shopper_product_id` int(11) DEFAULT NULL,
  `shop_id` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `discount` varchar(255) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `like_count` int(11) DEFAULT 0,
  `comment_count` int(11) DEFAULT 0,
  `share_count` int(11) DEFAULT 0,
  `rating` double DEFAULT 0,
  `category` varchar(255) DEFAULT NULL,
  `post_content` varchar(255) NOT NULL,
  `post_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `shopper_product_id`, `shop_id`, `date`, `discount`, `duration`, `location`, `like_count`, `comment_count`, `share_count`, `rating`, `category`, `post_content`, `post_img`) VALUES
(20, 27, 17, '2023-10-05T11:35:20.141Z', '3', '', '', 1, 2, 0, 0, 'regular', '', ''),
(21, 28, 17, '2023-10-10T13:36:49.895Z', '77', '', '', 1, 0, 0, 0, 'regular', 'Vanity Bag Starting From TK.8.05', ''),
(22, 29, 17, '2023-10-10T14:58:58.255Z', '2', '', '', 0, 1, 0, 0, 'regular', 'Potato Chips  Starting From TK.34.30', ''),
(23, 30, 17, '2023-10-10T15:32:38.534Z', '3', '', '', 0, 0, 0, 0, 'regular', '7 up Normal Starting From TK.41.71', ''),
(24, 31, 17, '2023-10-10T15:33:13.701Z', '40', '', '', 0, 3, 0, 0, 'regular', '7 up Verified Starting From TK.84.00', ''),
(25, NULL, 20, '2023-10-13T16:46:31.768Z', NULL, NULL, NULL, 0, 0, 0, 0, 'regular', 'Admin Post', '1697215591745__20230807_154229.jpg'),
(26, 32, 17, '2023-10-13T17:13:43.052Z', '10', '', '', 1, 0, 0, 0, 'regular', '7 up Verified \n TK.180.90', ''),
(27, 33, 17, '2023-10-13T17:14:21.853Z', '10', '', '', 1, 0, 0, 0, 'regular', '7 up Normal Starting From TK.180.00', ''),
(28, 34, 17, '2023-10-13T17:14:48.018Z', '0', '', '', 2, 1, 0, 0, 'regular', 'Potato Chips  Starting From TK.10', ''),
(33, 39, 17, '2023-10-14T14:41:52.385Z', '0', '', '', 1, 1, 0, 0, 'regular', ' Sprite (20 Fl Oz Bottle) varified Starting From TK.23', ''),
(34, 40, 17, '2023-10-14T14:42:05.088Z', '0', '', '', 0, 1, 0, 0, 'regular', ' Sprite (20 Fl Oz Bottle) Starting From TK.2', ''),
(35, NULL, 36, '2023-10-14T16:50:11.727Z', NULL, NULL, NULL, 0, 1, 0, 0, 'regular', 'sfsad', '1697302211699__PIC ME &FRIEND  (1).jpeg'),
(36, NULL, 73, '2023-10-17T14:34:57.936Z', NULL, NULL, NULL, 0, 3, 0, 0, 'regular', 'coke khaibaa naki?', '1697553297857__coke.jpg'),
(37, NULL, 36, '2023-10-18T17:47:08.222Z', NULL, NULL, NULL, 2, 4, 0, 0, 'regular', '', '1697651228172__image.jpg'),
(38, 41, 17, '2023-10-27T15:15:01.479Z', '4', '', '', 0, 0, 0, 0, 'regular', 'Yellow Rice Starting From TK.416.64', ''),
(39, NULL, 36, '2023-10-29T14:34:15.139Z', NULL, NULL, NULL, 0, 0, 0, 0, 'regular', 'zxcZxc', ''),
(42, 46, 17, '2023-10-29T14:42:53.597Z', '8', '', '', 0, 0, 0, 0, 'regular', 'Coke Cola Original TK.501.40', '1697265631757__coke.jpg'),
(43, 47, 17, '2023-10-30T14:49:55.722Z', '-1', '', '', 0, 0, 0, 0, 'regular', 'Chilli SauceTK.150', '1698677186176__BD-chili-Sauce--1kg.jpg'),
(44, 48, 17, '2023-10-30T14:50:37.511Z', '0', '', '', 1, 1, 0, 0, 'regular', 'Pran-Sauce-750-gm TK.270', '1698677343796__Pran-Sauce-750-gm.jpg'),
(45, 49, 17, '2023-11-01T17:07:35.664Z', '3', '', '', 1, 0, 0, 0, 'regular', 'Yellow RiceTK.323.01', '1696949688320__milled-rice-bowl-wooden-spoon-black-cement-floor.jpg'),
(46, 50, 17, '2023-11-05T13:06:44.531Z', '1', '', '', 1, 2, 0, 0, 'regular', 'Hand bag In Town TK.33.66', '1696949606356__bag.png');

-- --------------------------------------------------------

--
-- Table structure for table `news_comment`
--

CREATE TABLE `news_comment` (
  `id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  `commented_by` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `news_time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news_comment`
--

INSERT INTO `news_comment` (`id`, `news_id`, `commented_by`, `comment`, `news_time`) VALUES
(36, 20, 17, 'Not Interested', '10/10/2023, 7:39:13 PM'),
(37, 20, 17, 'Nice', '10/10/2023, 7:39:15 PM'),
(38, 22, 20, 'Excellent', '10/11/2023, 5:25:11 PM'),
(39, 24, 17, 'Excellent', '10/13/2023, 8:41:08 PM'),
(40, 24, 17, 'Nice', '10/13/2023, 8:41:24 PM'),
(41, 24, 17, 'cool', '10/13/2023, 8:42:14 PM'),
(42, 36, 73, 'Not Interested', '10/17/2023, 8:37:45 PM'),
(43, 37, 36, 'Interested', '10/18/2023, 11:47:15 PM'),
(44, 37, 36, 'Bad', '10/18/2023, 11:47:17 PM'),
(45, 37, 36, 'cool', '10/18/2023, 11:47:18 PM'),
(46, 37, 36, 'Nice', '10/27/2023, 9:39:14 PM'),
(47, 36, 36, 'Nice', '10/27/2023, 9:39:22 PM'),
(48, 36, 36, 'Excellent', '10/27/2023, 9:39:24 PM'),
(49, 35, 36, 'cool', '10/27/2023, 9:39:30 PM'),
(50, 34, 36, 'Interested', '10/27/2023, 9:39:35 PM'),
(51, 33, 36, 'Interested', '10/27/2023, 9:39:39 PM'),
(52, 44, 36, 'Not Interested', '10/31/2023, 3:49:10 PM'),
(54, 28, 36, 'Interested', '10/31/2023, 7:05:04 PM'),
(55, 46, 17, 'Interested', '11/10/2023, 12:34:10 AM'),
(60, 46, 16, 'Excellent', '12/31/2023, 11:21:10 PM');

-- --------------------------------------------------------

--
-- Table structure for table `news_like`
--

CREATE TABLE `news_like` (
  `id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  `liked_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news_like`
--

INSERT INTO `news_like` (`id`, `news_id`, `liked_by`) VALUES
(33, 21, 20),
(34, 20, 20),
(58, 36, 36),
(59, 34, 36),
(60, 34, 36),
(61, 34, 36),
(62, 34, 36),
(63, 44, 36),
(64, 28, 36),
(65, 37, 36),
(67, 46, 16),
(68, 45, 16);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `notification_content` varchar(255) DEFAULT NULL,
  `notification_time` varchar(255) DEFAULT NULL,
  `not_from` int(11) NOT NULL,
  `not_to` int(11) NOT NULL,
  `status` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `notification_content`, `notification_time`, `not_from`, `not_to`, `status`) VALUES
(1, 'Not asdasdasdsd', '12-12-12', 3, 3, 0),
(2, 'You have a new order. Order Number is #29.', '2023-10-12 19:40:12', 3, 17, 0),
(3, 'You have a new order. Order Number is #30.', '2023-10-13 16:59:57', 17, 16, 0),
(4, 'You have a new order. Order Number is #31.', '2023-10-14 15:15:21', 17, 36, 0),
(5, 'You have a new order. Order Number is #32.', '2023-10-14 16:53:10', 17, 36, 0),
(6, 'You have a new order. Order Number is #33.', '2023-10-16 17:55:50', 11, 36, 0),
(7, 'You have a new order. Order Number is #34.', '2023-10-17 14:41:59', 17, 73, 0),
(8, 'You have a new order. Order Number is #35.', '2023-10-21 15:39:18', 11, 36, 0),
(9, 'You have a new order. Order Number is #36.', '2023-10-21 15:40:26', 17, 36, 0),
(10, 'You have a new order. Order Number is #37.', '2023-10-21 16:27:45', 17, 36, 0),
(11, 'You have a new order. Order Number is #38.', '2023-10-21 16:27:45', 17, 36, 0),
(12, 'You have a new order. Order Number is #39.', '2023-10-21 17:14:12', 11, 36, 0),
(13, 'You have a new order. Order Number is #40.', '2023-10-27 15:38:32', 11, 36, 0),
(14, 'You have a new order. Order Number is #41.', '2023-11-04 19:13:17', 17, 36, 0),
(15, 'You have a new order. Order Number is #42.', '2023-11-04 19:56:50', 11, 36, 0),
(16, 'You have a new order. Order Number is #43.', '2023-11-04 19:59:34', 17, 36, 0),
(17, 'You have a new order. Order Number is #44.', '2023-11-04 20:01:00', 17, 36, 0),
(18, 'You have a new order. Order Number is #45.', '2023-11-08 14:03:48', 3, 36, 0),
(19, 'You have a new order. Order Number is #46.', '2023-11-08 17:27:52', 17, 36, 0),
(20, 'You have a new order. Order Number is #47.', '2023-11-08 17:48:48', 17, 36, 0),
(21, 'You have a new order. Order Number is #48.', '2023-11-08 17:55:37', 3, 36, 0),
(22, 'You have a new order. Order Number is #49.', '2023-11-09 15:51:12', 17, 36, 0),
(23, 'You have a new order. Order Number is #50.', '2023-11-09 18:06:45', 17, 36, 0),
(24, 'You have a new order. Order Number is #51.', '2023-11-09 18:07:52', 17, 36, 0),
(25, 'You have a new order. Order Number is #52.', '2023-11-16 15:51:08', 17, 36, 0),
(26, 'You have a new order. Order Number is #53.', '2023-11-16 15:52:18', 11, 36, 0),
(27, 'You have a new order. Order Number is #54.', '2023-11-18 07:04:21', 11, 36, 0),
(28, 'You have a new order. Order Number is #55.', '2023-11-18 07:06:44', 17, 36, 0),
(29, 'You have a new order. Order Number is #56.', '2023-11-18 09:09:39', 11, 36, 0),
(30, 'You have a new order. Order Number is #57.', '2023-11-18 09:14:02', 17, 36, 0),
(31, 'You have a new order. Order Number is #58.', '2023-11-18 09:23:24', 17, 36, 0),
(32, 'You have a new order. Order Number is #59.', '2023-11-18 09:49:24', 17, 36, 0),
(33, 'You have a new order. Order Number is #60.', '2023-11-18 09:52:12', 17, 36, 0),
(34, 'You have a new order. Order Number is #61.', '2023-11-18 10:08:44', 17, 36, 0),
(35, 'You have a new order. Order Number is #62.', '2023-11-20 12:56:20', 17, 36, 0),
(36, 'You have a new order. Order Number is #63.', '2023-11-20 12:57:08', 3, 36, 0),
(37, 'You have a new order. Order Number is #64.', '2023-11-20 14:01:32', 11, 36, 0),
(38, 'You have a new order. Order Number is #65.', '2023-11-20 14:01:41', 17, 36, 0),
(39, 'You have a new order. Order Number is #66.', '2023-11-20 16:01:23', 3, 36, 0),
(40, 'You have a new order. Order Number is #67.', '2023-11-20 16:02:27', 11, 36, 0),
(41, 'You have a new order. Order Number is #68.', '2023-11-20 16:06:03', 17, 36, 0),
(42, 'You have a new order. Order Number is #69.', '2023-11-20 16:30:43', 3, 36, 0),
(43, 'You have a new order. Order Number is #70.', '2023-11-22 18:31:14', 3, 36, 0),
(44, 'You have a new order. Order Number is #71.', '2023-11-24 18:20:35', 11, 36, 0),
(45, 'You have a new order. Order Number is #72.', '2023-11-24 18:21:10', 17, 36, 0),
(46, 'You have a new order. Order Number is #73.', '2023-11-26 16:41:11', 17, 36, 0),
(47, 'You have a new order. Order Number is #74.', '2023-11-28 13:21:57', 17, 36, 0),
(48, 'You have a new order. Order Number is #75.', '2023-11-28 13:26:15', 17, 36, 0),
(49, 'You have a new order. Order Number is #76.', '2023-11-28 13:37:03', 17, 36, 0),
(50, 'You have a new order. Order Number is #77.', '2023-12-06 00:16:26', 17, 16, 0),
(51, 'You have a new order. Order Number is #78.', '2023-12-27 20:35:37', 17, 36, 0),
(52, 'You have a new order. Order Number is #79.', '2023-12-29 19:51:26', 17, 36, 0),
(53, 'You have a new order. Order Number is #80.', '2023-12-31 16:31:53', 17, 36, 0),
(54, 'You have a new comment in your post. commented by anik', '2023-12-31 23:21:10', 16, 17, 0),
(55, 'anik liked your post', '2023-12-31 23:49:59', 16, 17, 0),
(56, 'You have a new order. Order Number is #87.', '2024-01-05 00:37:55', 17, 16, 1),
(57, 'You have a new order. Order Number is #92.', '2024-01-05 00:39:52', 17, 16, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ordered_product`
--

CREATE TABLE `ordered_product` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `discount` decimal(20,3) NOT NULL,
  `quantity` decimal(20,3) NOT NULL,
  `price` decimal(20,3) NOT NULL,
  `weight` decimal(20,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ordered_product`
--

INSERT INTO `ordered_product` (`id`, `order_id`, `product_id`, `discount`, `quantity`, `price`, `weight`) VALUES
(1, 91, 41, 4.000, 1.000, 434.000, 0.000),
(2, 91, 32, 10.000, 1.000, 201.000, 0.000),
(3, 92, 41, 4.000, 2.000, 434.000, 0.000),
(4, 92, 32, 10.000, 2.000, 201.000, 0.000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `short_description` varchar(100) DEFAULT NULL,
  `full_description` varchar(255) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `isVerified` varchar(15) DEFAULT NULL,
  `price` decimal(20,3) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `sku`, `name`, `image`, `short_description`, `full_description`, `category_id`, `isVerified`, `price`, `quantity`) VALUES
(1, NULL, 'gg product', 'WelcomeScan.jpg', '10', '', 3, 'verified', 0.000, NULL),
(11, NULL, 'Alo Potato', '1689276807795__Welcome Scan.jpg', '10', '1010 updated', 1, NULL, 70.000, NULL),
(12, NULL, 'Vanity Bag', '1690478518635__Welcome Scan.jpg', 'Bag', 'Bag', 14, NULL, NULL, NULL),
(13, NULL, 'sugar update', '1691920308947__Welcome Scan.jpg', '10', '10', 1, NULL, NULL, NULL),
(14, NULL, 'Ishan Tea ', '1693931993449__20230807_154229.jpg', 'Cha pata', 'Cha pata From Sylhet ', 16, 'verified', 90.000, NULL),
(15, NULL, 'Hand bag In Town', '1696949606356__bag.png', 'This is a hand bag , ', 'This is a benity bag , and this is fopr women', 14, NULL, NULL, NULL),
(16, NULL, 'Yellow Rice', '1696949688320__milled-rice-bowl-wooden-spoon-black-cement-floor.jpg', 'RIce Desc updated by Towhid', 'Rice in Bangladesh Rice is the staple food of about 135 million people of Bangladesh. It provides nearly 48% of rural employment, about two-third of total calorie supply and about one-half of the total protein intake of an average person in the country. R', 12, 'verified', 98.000, NULL),
(17, NULL, 'Photato chips', '1696949827009__1678540367603.jpg', 'asdfasd', 'asdvgasdvasdfvgasdv', 2, 'verified', 98.000, NULL),
(18, NULL, '7 up Normal', '1696951856422__7upimage.jpg', 'This is 7 up', 'This is 7 up', 2, 'notVerified', NULL, NULL),
(19, NULL, '7 up Verified', '1696951925428__photo-1622766815178-641bef2b4630.jpg', '7 up Verified', '7 up Verified', 2, 'verified', 90.000, NULL),
(42, NULL, ' Sprite (20 Fl Oz Bottle)', '1697265535780__sprite1.jpg', ' Sprite (20 Fl Oz Bottle)', ' Sprite (20 Fl Oz Bottle)', 2, 'notVerified', 0.000, 0),
(43, NULL, ' Sprite (20 Fl Oz Bottle) varified', '1697265581988__sprite1.jpg', ' Sprite (20 Fl Oz Bottle)', ' Sprite (20 Fl Oz Bottle)', 2, 'verified', 90.000, 43),
(44, NULL, 'Coke Cola Original', '1697265631757__coke.jpg', 'Coca-Cola Classic strikes the perfect balance between sweetness and acidity, resulting in a harmonio', 'Coca-Cola Classic strikes the perfect balance between sweetness and acidity, resulting in a harmonious blend that is simply irresistible. The careful combination of ingredients ensures that every sip delivers a satisfying and well-rounded flavour. This ic', 2, 'notVerified', 0.000, 0),
(45, NULL, 'Chilli Sauce', '1698677186176__BD-chili-Sauce--1kg.jpg', 'Chilli sauce, also commonly spelled as \"chili sauce\" or \"hot sauce,\" is a condiment made from chili ', 'Chili sauce can be used as a condiment, marinade, or ingredient in cooking to add heat and flavor to dishes such as tacos, burgers, stir-fries, and more. When choosing a chili sauce, consider your heat tolerance, as well as the specific flavor profile you', 17, 'notVerified', 0.000, 0),
(46, NULL, 'Pran-Sauce-750-gm', '1698677343796__Pran-Sauce-750-gm.jpg', 'Pran hot tomato sauce plastic jar is one of the most popular sauces in Bangladesh. ', 'Pran hot tomato sauce plastic jar is one of the most popular sauces in Bangladesh. it is enriched with the power of fresh tomato, red chili, sugar, onion. 100% natural flavor and organic taste.', 17, 'verified', 270.000, 50),
(47, NULL, 'Mango Pickle', '1703680620299__download.jpeg', 'Mango pickle is a popular condiment in many cuisines, particularly in South Asia. ', 'Mango pickle is a popular condiment in many cuisines, particularly in South Asia. It\'s made by preserving raw mangoes in a mixture of various spices, oil, and sometimes vinegar. The preparation methods and spice mixtures can vary widely based on regional ', 2, 'notVerified', 191.000, 59),
(48, NULL, 'Pran Olive Pickle', '1703680891922__pran-olive-pickle-400-gm.jpeg', 'Pran Olive Pickle', 'Pran Olive Pickle', 2, 'verified', 135.000, 100),
(49, NULL, 'Pran Olive Pickle n-v', '1703680913920__pran-olive-pickle-400-gm.jpeg', 'Pran Olive Pickle', 'Pran Olive Pickle', 2, 'notVerified', 0.000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_order`
--

CREATE TABLE `product_order` (
  `id` int(11) NOT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `customer_profile_id` int(11) NOT NULL,
  `shopper_id` int(11) NOT NULL,
  `price` decimal(20,3) NOT NULL,
  `cancel_report` text DEFAULT NULL,
  `order_time` datetime NOT NULL,
  `shopper_order_accept_time` datetime DEFAULT NULL,
  `delivery_time` datetime DEFAULT NULL,
  `order_delay_report` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_order`
--

INSERT INTO `product_order` (`id`, `order_status`, `customer_profile_id`, `shopper_id`, `price`, `cancel_report`, `order_time`, `shopper_order_accept_time`, `delivery_time`, `order_delay_report`) VALUES
(87, 'pending', 16, 17, 597.540, NULL, '2024-01-05 00:32:52', NULL, NULL, NULL),
(88, 'pending', 16, 17, 597.540, NULL, '2024-01-05 00:35:09', NULL, NULL, NULL),
(89, 'pending', 16, 17, 597.540, NULL, '2024-01-05 00:35:48', NULL, NULL, NULL),
(90, 'pending', 16, 17, 597.540, NULL, '2024-01-05 00:36:33', NULL, NULL, NULL),
(91, 'pending', 16, 17, 597.540, NULL, '2024-01-05 00:37:55', NULL, NULL, NULL),
(92, 'pending', 16, 17, 1195.080, NULL, '2024-01-05 00:39:52', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `refer`
--

CREATE TABLE `refer` (
  `id` int(11) NOT NULL,
  `referred_by` int(11) NOT NULL,
  `referred_to` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `refer`
--

INSERT INTO `refer` (`id`, `referred_by`, `referred_to`) VALUES
(3, 48, 17),
(8, 48, 36),
(10, 48, 49),
(11, 17, 58),
(12, 58, 20),
(13, 48, 61),
(14, 48, 61),
(15, 48, 61),
(16, 48, 61),
(17, 58, 65),
(18, 58, 66),
(19, 58, 67),
(20, 58, 68),
(21, 58, 71),
(22, 71, 72),
(23, 58, 73);

-- --------------------------------------------------------

--
-- Table structure for table `shopper_product`
--

CREATE TABLE `shopper_product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(20,3) NOT NULL,
  `discount` decimal(20,3) NOT NULL,
  `product_count` int(11) NOT NULL,
  `sale_count` int(11) DEFAULT 0,
  `wishlist_count` int(11) DEFAULT 0,
  `rating_count` int(11) DEFAULT 0,
  `product_id` int(11) NOT NULL,
  `shopper_id` int(11) NOT NULL,
  `view` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shopper_product`
--

INSERT INTO `shopper_product` (`id`, `name`, `price`, `discount`, `product_count`, `sale_count`, `wishlist_count`, `rating_count`, `product_id`, `shopper_id`, `view`) VALUES
(1, 'gg product', 99.000, 10.000, 100, 10, 2, 3, 1, 11, 17),
(4, 'sugar', 10.000, 0.000, 100, 11, 0, 0, 13, 11, 39),
(8, 'Vanity Bag', 100.000, 2.000, 25, 0, 0, 0, 12, 3, 3),
(14, 'sugar', 25.000, 0.000, 110, 0, 0, 0, 13, 3, 1),
(15, 'Vanity Bag', 499.000, 5.000, 1000, 0, 0, 0, 12, 3, 3),
(17, 'sugar', 26.000, 0.000, 100, 0, 0, 0, 13, 15, 1),
(26, 'Ishan Tea', 124.000, 2.000, 20, 40, 0, 0, 14, 17, 9),
(27, 'sugar', 34.000, 3.000, 19, 0, 0, 0, 13, 17, 1),
(28, 'Vanity Bag', 35.000, 77.000, 67, 0, 0, 0, 12, 17, 1),
(29, 'Potato Chips ', 35.000, 2.000, 4, 0, 0, 0, 17, 17, 8),
(30, '7 up Normal', 43.000, 3.000, 1000, 0, 0, 0, 18, 17, 0),
(31, '7 up Verified', 140.000, 40.000, 54, 0, 0, 0, 19, 17, 8),
(32, '7 up Verified', 201.000, 10.000, 100, 100, 0, 0, 19, 17, 15),
(33, '7 up Normal', 200.000, 10.000, 10, 0, 0, 0, 18, 17, 0),
(34, 'Potato Chips ', 10.000, 0.000, 100, 50, 0, 0, 17, 17, 1),
(39, ' Sprite (20 Fl Oz Bottle) varified', 600.000, 6.000, 60, 0, 0, 0, 43, 17, 7),
(40, ' Sprite (20 Fl Oz Bottle)', 2.000, 0.000, 88, 0, 0, 0, 42, 17, 3),
(41, 'Yellow Rice', 434.000, 4.000, 33, 120, 0, 0, 16, 17, 35),
(42, 'Coke Cola Original', 35.000, 0.000, 33, 0, 0, 0, 44, 17, 0),
(43, 'Ishan Tea ', 23.000, 3.000, 22, 0, 0, 0, 14, 17, 0),
(45, 'Hand bag In Town', 272.000, 7.000, 34, 0, 0, 0, 15, 17, 0),
(46, 'Coke Cola Original', 545.000, 8.000, 45, 0, 0, 0, 44, 17, 0),
(47, 'Chilli Sauce', 150.000, -1.000, 32, 0, 0, 0, 45, 17, 2),
(48, 'Pran-Sauce-750-gm', 27000.000, 27.000, 27, 0, 0, 0, 46, 17, 7),
(49, 'Yellow Rice', 333.000, 3.000, 34, 0, 0, 0, 16, 17, 0),
(50, 'Hand bag In Town', 34.000, 1.000, 32, 0, 0, 0, 15, 17, 1),
(51, 'gg product', 200.000, 0.000, 8, 0, 0, 0, 1, 17, 0),
(52, 'Vanity Bag', 100.000, 1.000, 2, 0, 0, 0, 12, 17, 0),
(53, 'Alo Potato', 100.000, 1.000, 3, 0, 0, 0, 11, 17, 0),
(54, 'Hand bag In Town', 300.000, 2.000, 3, 0, 0, 0, 15, 17, 0),
(55, 'Pran-Sauce-750-gm', 1.000, 0.000, 1, 0, 0, 0, 46, 17, 0),
(56, 'gg product', 20.000, 4.000, 3, 0, 0, 0, 1, 17, 1),
(57, 'gg product', 100.000, 0.000, 6, 0, 0, 0, 1, 17, 1),
(58, 'Hand bag In Town', 300.000, 2.000, 3, 0, 0, 0, 15, 17, 0),
(59, 'Chilli Sauce', 120.000, 1.000, 29, 0, 0, 0, 45, 17, 0),
(60, 'Coke Cola Original', 300.000, 2.000, 7, 0, 0, 0, 44, 17, 0),
(61, ' Sprite (20 Fl Oz Bottle) varified', 20.000, 0.000, 18, 0, 0, 0, 43, 17, 0);

-- --------------------------------------------------------

--
-- Table structure for table `util`
--

CREATE TABLE `util` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `util`
--

INSERT INTO `util` (`id`, `label`, `value`) VALUES
(1, 'cart_order_timer', '120');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_profile`
--
ALTER TABLE `customer_profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `hero_slider`
--
ALTER TABLE `hero_slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `fk_shopper_product_id` (`shopper_product_id`);

--
-- Indexes for table `news_comment`
--
ALTER TABLE `news_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `news_id` (`news_id`),
  ADD KEY `commented_by` (`commented_by`);

--
-- Indexes for table `news_like`
--
ALTER TABLE `news_like`
  ADD PRIMARY KEY (`id`),
  ADD KEY `liked_by` (`liked_by`),
  ADD KEY `news_id` (`news_id`) USING BTREE;

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ordered_from` (`not_from`),
  ADD KEY `ordered_by` (`not_to`);

--
-- Indexes for table `ordered_product`
--
ALTER TABLE `ordered_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_order`
--
ALTER TABLE `product_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_profile_id` (`customer_profile_id`),
  ADD KEY `shopper_id` (`shopper_id`);

--
-- Indexes for table `refer`
--
ALTER TABLE `refer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopper_product`
--
ALTER TABLE `shopper_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `shopper_id` (`shopper_id`);

--
-- Indexes for table `util`
--
ALTER TABLE `util`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `customer_profile`
--
ALTER TABLE `customer_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `hero_slider`
--
ALTER TABLE `hero_slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `news_comment`
--
ALTER TABLE `news_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `news_like`
--
ALTER TABLE `news_like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `ordered_product`
--
ALTER TABLE `ordered_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `product_order`
--
ALTER TABLE `product_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `refer`
--
ALTER TABLE `refer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `shopper_product`
--
ALTER TABLE `shopper_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `util`
--
ALTER TABLE `util`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `fk_shopper_product_id` FOREIGN KEY (`shopper_product_id`) REFERENCES `shopper_product` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`shopper_product_id`) REFERENCES `shopper_product` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `news_ibfk_2` FOREIGN KEY (`shop_id`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `news_comment`
--
ALTER TABLE `news_comment`
  ADD CONSTRAINT `news_comment_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `news_comment_ibfk_2` FOREIGN KEY (`commented_by`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `news_like`
--
ALTER TABLE `news_like`
  ADD CONSTRAINT `news_like_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `news_like_ibfk_3` FOREIGN KEY (`liked_by`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`not_from`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`not_to`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ordered_product`
--
ALTER TABLE `ordered_product`
  ADD CONSTRAINT `ordered_product_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `product_order` (`id`),
  ADD CONSTRAINT `ordered_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `shopper_product` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_order`
--
ALTER TABLE `product_order`
  ADD CONSTRAINT `product_order_ibfk_1` FOREIGN KEY (`customer_profile_id`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_order_ibfk_2` FOREIGN KEY (`shopper_id`) REFERENCES `customer_profile` (`id`);

--
-- Constraints for table `shopper_product`
--
ALTER TABLE `shopper_product`
  ADD CONSTRAINT `shopper_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `shopper_product_ibfk_2` FOREIGN KEY (`shopper_id`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
