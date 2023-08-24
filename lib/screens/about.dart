

import 'package:flutter/material.dart';
import 'package:portfolio/sizes.dart';
import 'package:portfolio/widgets/widgets.dart';

class About extends StatefulWidget {
  const About({Key? key}) : super(key: key);

  @override
  State<About> createState() => _AboutState();
}

class _AboutState extends State<About> {


  @override
  Widget build(BuildContext context) {

    return Container(
      width: screenWidth(context, mulBy: 1),
      //height: screenHeight(context)-70,  ///Reducing 70 for appbar
      //color: const Color(0xff0c0c0c),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [
            Color(0xff0c0c0c),
            Color(0xff0f1617),
            Color(0xff0c0c0c)
          ],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter
        )
      ),
      constraints: BoxConstraints(
        minWidth: 500,
        minHeight: screenHeight(context),
      ),
      padding: EdgeInsets.symmetric(
          horizontal: screenWidth(context, mulBy: 0.05),
          vertical: screenHeight(context, mulBy: 0.07)
      ),
      child: Wrap(
        direction: Axis.horizontal,
        crossAxisAlignment: WrapCrossAlignment.center,
        alignment: WrapAlignment.spaceEvenly,
        runAlignment: WrapAlignment.spaceEvenly,
        spacing: 20,
        runSpacing: 40,
        children: [
          SizedBox(
            width: 600,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Texter(
                  "About Me",
                  style: TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 34,
                      color: Theme.of(context).secondaryHeaderColor
                  ),
                ),
                const SizedBox(
                  height: 30,
                ),
                const Texter(
                  "As an enthusiastic and penultimate undergraduate Computer Science student, I am constantly driven by my insatiable curiosity for all things tech. My fascination with these fields has driven me to explore their depths, as I work towards becoming proficient in harnessing their power to shape the future. My experience extends to Flutter development, web development, and mobile app development, where I've had the pleasure of crafting digital experiences that merge creativity with functionality.\n\n"
                  "While I'm sharpening my skills, I'm also gaining practical insights as a QA Engineer at a non-profit organization, where I ensure that software meets the highest standards of quality and performance.\n\n"
                  "Outside of my academic and professional pursuits, you can find me experimenting with new programming languages, attending hackathons, and soaking up knowledge from every avenue. I believe that in the ever-evolving tech landscape, the hunger for knowledge is what fuels true innovation.",
                  style: TextStyle(
                    fontWeight: FontWeight.w300,
                    fontSize: 19,
                  ),
                  textAlign: TextAlign.start,
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Texter(
                "Skill Stack",
                style: TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 34,
                    color: Theme.of(context).secondaryHeaderColor
                ),
              ),
              const SizedBox(
                height: 25,
              ),
              Container(
                width: 400,
                clipBehavior: Clip.antiAlias,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                    color: const Color(0xff0c0c0c),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(
                        color: Colors.white,
                        width: 0.7
                    ),
                    boxShadow: const [
                      BoxShadow(
                          color: Color(0x2dffffff),
                          spreadRadius: 4,
                          blurRadius: 15
                      )
                    ]
                ),
                padding: const EdgeInsets.symmetric(
                    horizontal: 15,
                    vertical: 10
                ),
                constraints: const BoxConstraints(
                  minHeight: 480,
                ),
                child: const Texter(
                  "Flutter, Dart, Firebase, Supabase, Python, Java, Google Cloud Maps, GoLang",
                  style: TextStyle(
                      fontWeight: FontWeight.w800,
                      fontSize: 52,
                      color: Color(0x6b3093c0)
                  ),
                  textAlign: TextAlign.left,
                ),
              )
            ],
          ),
        ],
      ),
    );
  }
}
